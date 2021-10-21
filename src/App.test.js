import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App.js';
import { MenuS } from './components/MenuS';
import { ResumeOrder } from './components/ResumeOrder.jsx'
import { MenuBQ } from './components/MenuBQ.jsx';
import { MenuItem } from './components/MenuItem.jsx';
import { prettyDOM } from '@testing-library/dom';
import { fnData, state, setState } from '../test/mocks/mockstate'

/*
test("Resumer Orde Simple", () =>{

  const component = render(<ResumeOrder state = {state}/>)
  const div = component.container.querySelector("p")
  console.log(prettyDOM(div))
  console.log(div.innerHTML)
  console.log(prettyDOM(component.container))
  
  //component.debug()

  //div.getByText("Resume")

})
*/




test("Save Name of Costumer", async () =>{

  const nameCostumer = "Juana"
  const spectedNameCostumer = "Juana"

  const comMenuS = render(<MenuS state = {state} fnData = {fnData} />)
  const btnCO = screen.getByText(/Creat Order/i)
  fireEvent.click(btnCO)
  let inpuText = screen.getByPlaceholderText(/Name of Costumer/i)
  fireEvent.change(inpuText, { target: { value: nameCostumer } })
  const btnAdd = screen.getByText(/Add Costumer/i)
  fireEvent.click(btnAdd)
  console.log(state.costumers)
  expect(state.costumers).toEqual({ [spectedNameCostumer]: {} })
  console.log("Save Name state---------------------------------------",state)
  


  
  const btnSara = screen.getByText(/Juana/i)
  fireEvent.click(btnAdd)
  console.log("---------------------------------------",state)
 

  

})

test("Add item to the list", () =>{

  const menu = render(<MenuBQ state = {state} fnData = {fnData} />)
  const resume = render(<ResumeOrder state = {state}/>);
  const btnAddItem = screen.getByTestId("id-American Coffee-add")
  fireEvent.click(btnAddItem)
  console.log("Add Item state----------------------------------",state.costumers)
  expect(state.costumers).toEqual({
    Juana: { 'American Coffee': { quantity: 1, type: false, price: 5 } }
  })

})



test("Remove item to the list", () =>{

  
  const menu = render(<MenuBQ state = {state} fnData = {fnData} />)
  const resume = render(<ResumeOrder state = {state}/>);
  const btnRemItem = screen.getByTestId("id-American Coffee-rem")
  fireEvent.click(btnRemItem)
  console.log("Remove Item state----------------------------------",state.costumers)
  expect(state.costumers).toEqual({ Juana: {} })

})