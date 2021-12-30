import { Formik } from 'formik';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-web';
import FormikRadio from '../components/formik/FormikRadio';

class TesterPage extends Component {
    constructor(){
        super()
        this.state = {
            questions: [
                {question: "ทดสอบทดสอบทดสอบทดสอบ", result: null},
                {question: "ทดสอบทดสอบทดสอบทดสอบ", result: null},
                {question: "ทดสอบทดสอบทดสอบทดสอบ", result: null}
            ]
        }
    }

    convertJson = () => {
        return this.state.questions.map((_, index) => `covid-test-${index+1}`)
        .reduce((prev, curr) => { prev[curr] = false; return prev}, {})
        let json = { ...array };
        json = Object.assign({}, array);
        return array.reduce((json, value, key) => { json[key] = value; return json; }, {});
    }
    render() {
        return (
            <View style={style.container}>
                <Formik 
                    initialValues={
                        this.convertJson()
                    }
                    enableReinitialize={true}>
                    {({ handleChange, handleBlur, handleSubmit, values }) => 
                        {
                            console.log("values ", values)
                            return this.state.questions
                            .map(({question}, index) =>
                                <View>
                                    <Text style={style.question}>{`${index+1}. ${question}`}</Text>
                                    <FormikRadio name={`covid-test-${index+1}`} label="ใช่" handleChange={handleChange}/>
                                    <FormikRadio name={`covid-test-${index+1}`} label="ไม่ใช่" handleChange={handleChange}/>
                                </View>
                            )
                        }
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
    }
})

export default TesterPage;