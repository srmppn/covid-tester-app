import { Formik } from 'formik';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Image } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import Colors from '../components/common-style/Colors';
import Logo from "../../assets/logo.png";
import FormikRadio from '../components/formik/FormikRadio';

const covidTestForm = {
    URL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScJRlNftFZhJb8qptgvgJwSnNBD-hdCE49DBPI0bW11bMT0sw/formResponse"
}

class TesterPage extends Component {
    constructor(){
        super()
        this.state = {
            questions: [
                {question: "ท่านมีอาการหวัด เช่น ไอ มีน้ำมูก เจ็บคอ หรือจมูกไม่ได้กลิ่น ลิ้นไม่รับรส ภายใน 14 วันที่ผ่านมา"},
                {question: "ท่านมีประวัติเดินทางมาจากต่างประเทศ หรือพักอาศัยอยู๋ในต่างประเทศในช่วง 1 เดือนที่ผ่านมา"},
                {question: "ท่านมีประวัติสัมผัสกับผู้ป่วยยืนยัน โรคติดเชื้อ COVID-19"},
                {question: "ในสถานที่ท่านไปประจำ คนที่สนิทใกล้ชิดกับท่าน มีอาการไข้ ไอ น้ำมูก เสมหะมากกว่า 5 คน พร้อมๆ กัน ในช่วงเวลาภายในสัปดาห์หรือไม่"},
                {question: "ท่านเดินทางในยานพาหนะ (เครื่องบิน รถยนต์ รถไฟ เรือ หรือยานพาหนะอื่นๆ) เดียวกันและในช่วงเวลาเดียวกันกับผู้ป่วยยืนยัน COVID-19 ที่ทางราชการประกาศให้เข้ารับการสอบสวนโรค"},
                {question: "ท่านมีผลยืนยันการตรวจ ATK ด้วยตนเองเป็นบวก"},
                {question: "ท่านเคยมีประวัติติดเชื้อ COVID-19 น้อยกว่า 3 สัปดาห์ที่ผ่านมา"},
                {question: "วันนี้ท่านมีนัดพบแพทย์หรือไม่"},
            ],
            choices: [{label: "ใช่", value: "yes"}, {label: "ไม่ใช่", value: "no"}]
        }
    }

    diagnoseResult = (state) => {
        const answers = Object.keys(state)
        const hasAppointment = state[answers.pop()]
        return { passed: answers.some(key => state[key] === "yes"), hasAppointment: hasAppointment === "yes" };
    }

    convertJson = () => {
        return this.state.questions.map((_, index) => `covid-test-${index+1}`)
            .reduce((prev, curr) => { prev[curr] = ""; return prev}, {})
    }

    submitHandler = (values) => {
        const { state } = this.props.location
        const { passed, hasAppointment } = this.diagnoseResult(values)
        const params = {
          "entry.1944288684": state.prefix,
          "entry.38573224": state.firstname,
          "entry.1843805990": state.lastname,
          "entry.120237875": state.phone,
          "entry.1265149401": state.branch,
          "entry.1618681556": (passed ? "ผ่าน": "ไม่ผ่าน")
        }
        fetch(covidTestForm.URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(params).toString()
        })
        .then(r => {
            this.props.navigate(
                "/covid-result", 
                { 
                    state: { 
                        passed: passed, 
                        hasAppointment: hasAppointment
                    }
                }
            )
        })
        .catch(e => console.log(e))
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.headerContainer}>
                    <Image style={style.logo} source={Logo}/>
                    <Text style={style.textHeader}>โรงพยาบาลสมเด็จพระปิ่นเกล้า กรมแพทย์ทหารเรือ</Text>
                    <Text style={style.textTitle}>แบบคัดกรองความเสี่ยงต่อการติดเชื้อ COVID-19</Text>
                </View>
                <Formik 
                    initialValues={this.convertJson()}
                    enableReinitialize={true}
                    onSubmit={this.submitHandler}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => 
                        <View >
                            {
                                this.state.questions
                                    .map(({question}, index) =>
                                        <View style={style.questionContainer} key={index}>
                                            <Text>{`${index+1}. ${question}`}</Text>
                                            <FormikRadio name={`covid-test-${index+1}`} choices={this.state.choices} handleChange={handleChange}/>
                                        </View>
                                )
                            }
                            <Text style={style.warning}>** โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน **</Text>
                            <Button title="ยืนยัน" onPress={handleSubmit}/>
                        </View>
                    }
                </Formik>
            </View>
        );
    }
}
const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff'
    },
    headerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
      textAlign: "center",
      marginBottom: 20
    },
    logo: {
      width: 120,
      height: 120,
      padding: 3,
      alignItems: "center"
    },
    textHeader: {
      color: Colors.hospitalGreen,
      fontSize: 18,
      fontWeight: "bold"
    },
    textTitle: {
      fontSize: 16
    },
    questionContainer: {
      backgroundColor: Colors.lightGray,
      borderWidth: 1,
      borderRadius: 3,
      padding: 5,
      marginBottom: 10
    },
    warning: {
      color: Colors.secondary,
      marginBottom: 10
    }
})

function withRouter(props) {
    let navigate = useNavigate()
    let location = useLocation()
    return <TesterPage {...props} navigate={navigate} location={location}/>
}


export default withRouter;