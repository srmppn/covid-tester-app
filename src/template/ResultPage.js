import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../components/common-style/Colors';

class ResultPage extends Component {

    constructor(){
        super();
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
    }
});

function WithRouter(props) {
    let location = useLocation()
    let navigate = useNavigate()
    return <ResultPage {...props} navigate={navigate} location={location}/>
}  

export default WithRouter;