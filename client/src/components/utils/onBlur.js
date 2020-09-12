export const onBlur = (name) => {
  if (!inputs.name || inputs.name.length === 0) setErrores({ ...errores, errMsg: 'este campo es requerido' })
}