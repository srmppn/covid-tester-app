import React, { Component } from 'react';
import { Field, ErrorMessage } from 'formik';
import { View, Text, Picker } from 'react-native';
import { FormikStyle as style } from './FormikStyle';

export default class FormikSelect extends Component {
  constructor(){
    super();
    this.state = {
      default: "default"
    }
  }

  render() {
    console.log(this.props)
    const { label, name, suggest, options, setFieldValue } = this.props
    return (
      <View style={style.container}>
        <Text>{label}</Text>
        <Field name={name}>
          {({ field, form: { touched, errors }, meta }) =>
            (
            <Picker style={style.select} selectedValue={field.value} onValueChange={itemValue => setFieldValue(name, itemValue)}>
              { options.map(
                  (option, index) => <Picker.Item key={index} style={style.input} label={option.label} value={option.value} />) }
            </Picker>
          )}
        </Field>
      </View>
    )
  }
}
