import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native-web';
import { useLocation, useNavigate } from 'react-router-dom';
import Colors from '../components/common-style/Colors';
import FormikRadio from '../components/formik/FormikRadio';
import Logo from "../../assets/logo.png";

const userType = {
    GUESS: "guess",
    STAFF: "staff"
}

class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            choices: [
                {label: "บุคลากรในรพ.สมเด็จพระปิ่นเกล้า", value: userType.STAFF},
                {label: "ผู้รับบริการ", value: userType.GUESS}
            ]
        }
    }

    submitHandler = (values) => {
        switch(values.userType){
            case userType.GUESS:
                this.props.navigate("/user-info", values)
                break;
            case userType.STAFF:
                this.props.navigate("/covid-test", values)
                break;
            default:
                console.log(values)
                break;
        }
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.headerContainer}>
                    <Image style={style.logo} source={Logo}/>
                    <Text style={style.textHeader}>แบบทดสอบคัดกรองความเสี่ยงต่อการติดเชื้อ COVID-19</Text>
                    <Text style={style.textTitle}>{`กรุณาทำแบบคัดกรองล่วงหน้าในวันที่ท่านเข้ารับบริการ\n เพิ่อลดการสัมผัสและลดระยะเวลารอคอยในการคัดกรอง`}</Text>
                </View>
                <Formik 
                    initialValues={{userType: ""}}
                    enableReinitialize={true}
                    onSubmit={this.submitHandler}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => 
                        <View style={style.typeContainer}>
                            <View>
                                <Text>** กรุณาระบุประเภท</Text>
                                <FormikRadio name="userType" choices={this.state.choices} handleChange={handleChange}/>
                            </View>
                            <Button title="ดำเนินการต่อ" onPress={handleSubmit}/>
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerContainer: {
      textAlign: "center",
      marginBottom: 20,
      alignItems: 'center',
      textAlign: "center",
    },
    logo: {
      width: 120,
      height: 120,
      padding: 3,
      alignItems: "center"
    },
    textHeader: {
      fontWeight: "bold"
    },
    textTitle: {
      color: Colors.secondary
    },
    typeContainer: {
      flex: 1,
      textAlign: "left"
    }
});

function WithRouter(props) {
    let navigate = useNavigate()
    let location = useLocation()
    return <HomePage {...props} navigate={navigate} location={location}/>
}

export default WithRouter;