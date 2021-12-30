import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { View, Text } from 'react-native';
import { FormikStyle as style } from './FormikStyle';
import { RadioButton } from 'react-native-paper';

class FormikRadio extends React.Component {
  render() {
    const { label, name, suggest, placeholder, handleChange, handleBlur } = this.props
    return (
      <View style={style.container}>
        <Field type="radio" name={name}>
          {({ field, form: { touched, errors }, meta }) =>
            (<View>
                <RadioButton.Group onValueChange={handleChange(name)} value={field.value}>
                  <Text>{label}</Text>
                  <RadioButton value={true}></RadioButton>
                </RadioButton.Group>
              {suggest}
            </View>)}
        </Field>
      </View>
    )
  }
}

export default FormikRadio;