import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, CloseButton, Select, TextInput, Textarea } from '@mantine/core'

type DataType = {
  title: string;
  discription: string;
  status: string
}

function App() {
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string| null>('');
  const [discription, setDiscription] = useState<string>('');
  const [data, setData] =useState<DataType[]>()

  function onSubmit(){
    console.log("title",title)
    console.log("discription",discription)
    console.log("status",status)
    const storedJsonString = localStorage.getItem('myObject');

    // แปลง JSON string เป็น Object
    if(storedJsonString){
      const storedObject = JSON.parse(storedJsonString);
      const object = {
        title: title,
        discription: discription,
        status: status
      }
      console.log("Object",object);
      const updatedObject = [...storedObject, object];
  
  // เปลี่ยน updatedObject เป็น JSON string
    const updatedJsonString = JSON.stringify(updatedObject);
  
  // บันทึก updatedJsonString เข้า Local Storage
    localStorage.setItem('myObject', updatedJsonString);
    setData(updatedObject)
    console.log('data',data)
    }else{
      const object = {
        title: title,
        discription: discription,
        status: status
      }
      console.log("Object",object);
      const updatedObject = [object];
  // เปลี่ยน updatedObject เป็น JSON string
    const updatedJsonString = JSON.stringify(updatedObject);
  
  // บันทึก updatedJsonString เข้า Local Storage
    localStorage.setItem('myObject', updatedJsonString);
    }
  }

  function deleteData(index:number | undefined){
    console.log("delete",index)
    const dataDelete = JSON.parse(localStorage.getItem('myObject'));

// ตรวจสอบว่าข้อมูลมีอยู่และ index ที่ต้องการลบมีอยู่หรือไม่
    if (dataDelete && dataDelete.length > index) {
      // ลบข้อมูลที่ต้องการออก
      dataDelete.splice(index, 1);
      console.log('dataDelete',dataDelete)
      // บันทึกข้อมูลที่แก้ไขแล้วกลับไปยัง Local Storage
      localStorage.setItem('myObject', JSON.stringify(dataDelete));
      setData(dataDelete);
    }
  }

  function onChangeStatus(index:number,value: string){
    console.log("index",index)
    console.log('value',value)
    const dataChangeStatus = JSON.parse(localStorage.getItem('myObject'));
    console.log("data select",dataChangeStatus[index].status)
    dataChangeStatus[index].status = value;
    console.log("data selected",dataChangeStatus[index].status)
    console.log("dataChangeStatus",dataChangeStatus)
    localStorage.setItem('myObject', JSON.stringify(dataChangeStatus));
  }

  useEffect(() => {
    const storedJsonString = localStorage.getItem('myObject');

    // แปลง JSON string เป็น Object
    if(storedJsonString){
      const storedObject = JSON.parse(storedJsonString);
      
      const updatedObject = storedObject;
  
    setData(updatedObject);
    console.log("data",data)
    }
  }, [])
  
  return (
    <div>
     <div className='contrainer'>
      <div>
        <TextInput
          label="List Title"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
         />
        <Textarea
          label="Discription"
          placeholder="discription"
          value={discription}
          onChange={(event) => setDiscription(event.currentTarget.value)}
        />
        <Select
          label="Status"
          placeholder="Select status"
          data={['open', 'in progess', 'ready to deploy', 'complete']}
          value={status}
          onChange={setStatus}
        />
      </div>
      
    <Button className='button-submit' variant="filled " color="indigo" onClick={onSubmit}>Saved</Button>
    </div>
     <div className='contrainerCard' style={{display: 'flex' ,padding:10,justifyContent: 'center',position: 'absolute' ,backgroundColor: 'white', marginLeft:-550}}>
     {
        data?.map((item, index) => (
          <div key={index} className='card'>
            <div style={{display: 'flex'}}>
              <h1>{item.title}</h1>
              <CloseButton className='close-button' onClick={() => deleteData(index)} />
            </div>
            
            <div style={{padding:5,paddingLeft:10, backgroundColor: "white" ,borderRadius:2}}>{item.discription}</div>
            <Select
              label="Status"
              placeholder="Select status"
              data={['open', 'in progess', 'ready to deploy', 'complete']}
              defaultValue={item.status}
              onChange={(value) => onChangeStatus(index,value)}
            />
          </div>
        ))
     }
     </div>
    </div>
  )
}

export default App
