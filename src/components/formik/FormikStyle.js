import { StyleSheet } from "react-native"

export const FormikStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      paddingBottom: 10
    },
    input: {
      padding: 3,
      borderWidth: 1,
      borderRadius: 3,
      width: 230
    },
    select: {
      padding: 3,
      borderWidth: 1,
      borderRadius: 3,
      width: 230,
      fontSize: 14
    },
    radio: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    }
})