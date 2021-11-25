import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Input,
    Button,
    ButtonGroup
  } from "@chakra-ui/react"
  import axios from "axios";
  import React from "react";

  export default function InventoryTable({data, refresh, setLoading}) {

    const [newEntryData, setNewEntryData] = React.useState({name: '', stock:''})
    const [editEntryData, setEditEntryData] = React.useState({_id: '', name: '',stock:''})
    const [editEntryId, setEditEntryId] = React.useState("")

    const createRequest = async() => {
      setLoading(true)
      await axios.post(`/api/inventory`, newEntryData);
      refresh()
      setLoading(false)
    }

    const deleteRequest = async(event) => {
      setLoading(true)
      await axios.delete(`/api/inventory`, {data: {_id: event.target.id}})
      refresh()
      setLoading(false)
    }

    const putRequest = async() => {
      setLoading(true)
      const data = {_id: editEntryData._id, data: {name: editEntryData.name,  stock:editEntryData.stock}}
      await axios.put(`/api/inventory`, data);
      setEditEntryId("")
      refresh()
      setLoading(false)
    }

    const editEntry = (event) => {
      setEditEntryId(event.target.id)
      setEditEntryData(data.find(entry => entry._id == event.target.id))
    }

    const handleChange = (event) => {
      setNewEntryData({...newEntryData, [event.target.id]: event.target.value})
    }

    const handleEditChange = (event) => {
      setEditEntryData({...editEntryData, [event.target.id]: event.target.value})
    }
      
    return (
      <Table style={{width:'1000px'}}>
        <Thead>
          <Tr>
            <Th>name</Th>
            <Th>quantity</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>

          {data.map(entry => {
            if (entry._id == editEntryId) { return (
              <Tr key={entry._id}>
                <Td><Input id="name" placeholder={entry.name} onChange={handleEditChange}  variant="flushed"/></Td>
                <Td><Input id="stock" placeholder={entry.stock} onChange={handleEditChange} variant="flushed"/></Td>
                <Td><Button onClick={putRequest}>Done</Button></Td>
              </Tr>
            )}
            return (
              <Tr key={entry._id}>
                <Td>{entry.name}</Td>
                <Td>{entry.stock}</Td>
                <Td>
                  <ButtonGroup>
                    <Button id={entry._id} onClick={editEntry} >Edit</Button>
                    <Button id={entry._id} onClick={deleteRequest} >Remove</Button>
                  </ButtonGroup>
                </Td>
              </Tr>
                )})}

        </Tbody>
        <Tfoot>
          <Tr>
            <Td><Input id="name" placeholder="name" onChange={handleChange} variant="flushed"/></Td>
            <Td><Input id="stock" placeholder="quantity" onChange={handleChange} variant="flushed"/></Td>
            <Td><Button onClick={createRequest}>Add</Button></Td>
          </Tr>
        </Tfoot>
      </Table>
    );
  }