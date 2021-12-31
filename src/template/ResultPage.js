import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../components/common-style/Colors';

const feedbackForm = {
    URL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe6KFh5sz3RlzxuAOuOEUYzkcgwva6OJjpr-IuBvoifYnFWcQ/formResponse"
}

class ResultPage extends Component {

    constructor(){
        super();
        this.state = {
            score: -1
        }
    }

    passedComponent = (hasAppointment) => {
        return <View style={style.resultContainer}>
            <Icon style={style.iconSuccess} name='check-circle'/>
            <Text style={style.textResult}>{`ท่านได้รับการตรวจสอบ\n คัดกรอง Covid-19 แล้ว`}</Text>
            <Text style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</Text>
            <Text>{`กรุณาแสดงหน้าจอนี้ให้กับเจ้าหน้าที่\n เพื่อเข้ารับบริการของโรงพยาบาล`}</Text>
        </View>
    }

    nonPassedComponent = (hasAppointment) => {
        return <View style={style.resultContainer}>
            <Icon style={style.iconDanger} name='exclamation-circle'/>
            <Text style={style.textResult}>ท่านไม่ผ่านการคัดกรอง Covid-19</Text>
            <Text style={style.textResult}>{ hasAppointment ? "มีนัดพบแพทย์": "ไม่มีนัดพบแพทย์" }</Text>
            <Text>{`** กรุณาติดต่อเจ้าหน้าที่ **`}</Text>
        </View>
    }

    
    feedbackComponent = () => {
        const feedbackChoices = [
            {name: "frown-open", color: Colors.customRed, score: 0},
            {name: "frown", color: Colors.customOrange, score: 1},
            {name: "meh", color: Colors.customYellow,score: 2},
            {name: "smile", color: Colors.customGreen, score: 3},
            {name: "smile-wink", color: Colors.customDarkGreen, score: 4}
        ]
        const selectedStyle = {
            ...style.feedBackIcon,
            fontSize: 60
        }
        return <View style={style.feedbackContainer}>
            <Text>ประเมินความพึงพอใจของท่านในการใช้งาน application</Text>
            <View style={style.feedbackIconContainer}>
                {
                    feedbackChoices
                        .map(({name, color,score}) =>
                            {
                                return <Icon 
                                    style={score == this.state.score ? selectedStyle : style.feedBackIcon} 
                                    name={name} 
                                    color={color}
                                    onPress={() => this.setState({score: score})}
                                    solid/>
                            }
                        )
                }
            </View>
            <Button title="ยืนยัน" onPress={() => this.sendFeedback(this.state.score)}/>
        </View>
    }

    sendFeedback = (score) => {
        const params = {
          "entry.150406700": score
        }
        fetch(feedbackForm.URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(params).toString()
        })
        .then(r => {
            Alert.alert("ขอบคุณ", "ประเมินผลเรียบร้อยแล้ว", { text: "ปิดหน้าต่างนี้", onPress: () => {} })
        })
        .catch(e => console.log(e))
    }

    render() {
        const { state: {passed, hasAppointment} } = this.props.location
        return (
            <View style={style.container}>
                <View style={style.card}>
                    {
                        passed ?
                            this.nonPassedComponent(hasAppointment)
                            :
                            this.passedComponent(hasAppointment)
                    }
                </View>
                {this.feedbackComponent()}
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
    card: {
      borderWidth: 1,
      width: 300,
      height: 300,
      borderRadius: 3,
      backgroundColor: Colors.lightGray,
    },
    resultContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    },
    textResult: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
      fontWeight: "bold",
    },
    iconSuccess: {
      fontSize: 60,
      color: Colors.success
    },
    iconDanger: {
      fontSize: 60,
      color: Colors.warning
    },   
    feedbackContainer: {
        marginTop: 30,
        width: 200
      },
      feedbackIconContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
      },
      feedBackIcon: {
        fontSize: 30,
        marginLeft: 5,
        marginRight: 5
      }
});

function WithRouter(props) {
    let location = useLocation()
    let navigate = useNavigate()
    return <ResultPage {...props} navigate={navigate} location={location}/>
}  

export default WithRouter;