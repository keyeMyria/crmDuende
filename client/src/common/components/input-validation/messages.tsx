import * as React from 'react';

export const isRequired = (fieldName: string) => (
    <span> {fieldName} Es un campo requerido </span>
);

export const isEmail = () => (
    <span>  Ingresar un correo válido </span>
);

export const isUnique = (value: string) => (fieldName: string) => (
    <span> {fieldName} Ya existe debe de ingresar otro nombre {value} </span>
);

export const isPhone = (fieldName: string) =>  <span> {fieldName} no es un número válido </span>; 

export const noNumbers = (fieldName: string) => (
    <span> {fieldName}No debe de contener números </span>  
);

export const noAccents = (fieldName: string) => (
    <span> {fieldName} No debe de contener tildes </span>
);

export const noSpecialCharacters = (fieldName: string) => (
    <span> {fieldName} No debe de contener carácteres especiales </span>
);
export const alphaNum = (fieldName: string) => (
    <span> {fieldName} Error </span>
);

export const telephone = (fieldName: string) => (
    <span> {fieldName} Debe de ser un télefono </span>
);

export const maxTwoDecimals = (fieldName: string) => (
    <span> {fieldName} Máximo dos decimales </span>
);

export const isNumber = (fieldName: string) => (
    <span> {fieldName} Debe ser un número </span>
);

export const noZero = (fieldName: string) => (
    <span> {fieldName} No puede ser 0 </span>
);

export const noNegativeNumber = (fieldName: string) => (
    <span> {fieldName}No numeros negativos </span>
);
