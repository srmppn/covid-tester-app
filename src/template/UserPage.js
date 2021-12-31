import React, { Component } from 'react';
import FormikField from '../components/formik/FormikField';
import FormikSelect from '../components/formik/FormikSelect';
import { StyleSheet, Text, View, Button, Image, AppRegistry } from 'react-native';
import Colors from '../components/common-style/Colors';
import Logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom"
import { Formik } from 'formik';

class UserPage extends Component {

    constructor(){
        super()
        this.state = {
            branchOptions: [
            { label: "-- เลือกหน่วยบริการ --", value: "default" },
            { label: "หน่วยที่ 1", value: "branch1" },
            { label: "หน่วยที่ 2", value: "branch2" }
          ]
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <Image style={styles.logo} source={Logo}/>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>แบบคัดกรองความเสี่ยงต่อการติดเชื้อ COVID-19</Text>
                <Text style={styles.title}>โรงพยาบาลสมเด็จพระปิ่นเกล้า กรมแพทย์ทหารเรือ</Text>
            </View>
            <View style={styles.form}>
                <Formik 
                  initialValues={{prefix: "", firstname: "", lastname: "", phone: "", branch: ""}}
                  onSubmit={this.submitHandler}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                    <View>
                        <FormikField name="prefix" placeholder="คำนำหน้า" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikField name="firstname" placeholder="ชื่อจริง" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikField name="lastname" placeholder="นามสกุล" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikField name="phone" placeholder="เบอร์โทรศัพท์" handleChange={handleChange} handleBlur={handleBlur}/>
                        <FormikSelect name="branch" options={this.state.branchOptions} setFieldValue={setFieldValue} />
                        <Button title="ดำเนินการต่อ" onPress={() => this.props.navigate("/covid-test", {state: values})} style={styles.button}/>
                    </View>
                    )}
                </Formik>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerContainer: {
      textAlign: 'center',
      marginBottom: 20
    },
    logo: {
      width: 120,
      height: 120,
      padding: 3,
      alignItems: "center"
    },
    header: {
      color: Colors.hospitalGreen,
      fontSize: 18,
      fontWeight: "bold"
    },
    title: {
      fontSize: 15,
      color: Colors.secondary
    },
    form: {
      padding: 20
    },
    button: {
      textAlign: "right"
    }
});

function WithRouter(props) {
  let navigate = useNavigate()
  let location = useLocation()
  return <UserPage {...props} navigate={navigate} location={location}/>
}

export default WithRouter;
