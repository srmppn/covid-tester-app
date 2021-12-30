import React from 'react';
import { Field } from 'formik';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { FormikStyle as style } from './FormikStyle';

class FormikField extends React.Component {
  render() {
    const { label, name, suggest, placeholder, handleChange, handleBlur } = this.props
    return (
      <View style={style.container}>
        <Text>{label}</Text>
        <Field name={name}>
          {({ field, form: { touched, errors }, meta }) =>
            (<View>
              <TextInput 
                style={style.input}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                placeholder={placeholder}
                value={field.value} />
            </View>)}
        </Field>
      </View>
    )
  }
}

export default FormikField;