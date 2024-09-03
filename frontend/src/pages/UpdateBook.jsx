
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams,useNavigate} from 'react-router-dom';
const UpdateBook = () => {
const navigate = useNavigate();
    const {id}= useParams();
  const [Data, setData] = useState({
    url:"",
    title:"",
    author:"",
    price:"",
    desc:"",
    language:"",
  });
  
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
   
  const submit = async () => {
    try{
      if(
        Data.url === "" || Data.title ==="" ||Data.author ==="" || Data.price ==="" || Data.desc === "" || Data.language ===""
      ){
        alert("All field are required");
      }else{
        const response = await axios.put("https://books-1hil.onrender.com/api/users/update-book", Data, {
          headers: {
            id: localStorage.getItem("id"),
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            bookid: id,

          },
        });
        setData({
          url:"",
          title:"",
          author:"",
          price:"",
          desc:"",
          language:"",
        })
        alert(response.data.message);
        navigate("/all-books")
    
      }
    } catch (error){
      alert(error.response.data.message);
    }
  }
  useEffect(() => {
    const fetch = async () =>{
const response = await axios.get(`https://books-1hil.onrender.com/api/users//get-book-by-id/${id}`)
setData(response.data.data)
    }
    fetch();
  }, [id]);
  

  return (
    <div className='h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Update Book</h1>

  <div className='p-4 bg-zinc-800 rounded'>
    <div>
      <label htmlFor="" className='text-zinc-300'>Image</label>
    <input
type= 'text'
className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
placeholder='url of Image'
name="url"
required value={Data.url}
onChange={change}
    />
    </div>
<div className='mt-4'>
<label htmlFor="" className='text-zinc-300'>Title of book</label>
<input
type= 'text'
className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
placeholder='url of Image'
name="title"
required value={Data.title}
 onChange={change} 
/>
</div>
<div className='mt-4'>
<label htmlFor="" className='text-zinc-300'>Author of Book</label>
<input
type= 'text'
className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
placeholder=' Book Author '
name="author"
required value={Data.author}
onChange={change} 
/>
</div>
<div className='mt-4 flex gap-4'>
<div className='w-3/6'>
<label htmlFor="" className='text-zinc-300'>Language</label>
<input
type= 'text'
className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
placeholder='Language'
name="language"
 required value={Data.language}
onChange={change} 
/>
</div>
<div className='w-3/6'>
<label htmlFor="" className='text-zinc-300'>Price</label>
<input
type= 'number'
className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
placeholder='Book 
price'
name="price"
 required value={Data.price}
onChange={change} 
/>
</div>
</div>
<div className='mt-4'>
<label htmlFor="" className='text-zinc-300'>Description of book</label>
<input
type= 'text'
className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
placeholder='description'
name="desc"
required value={Data.desc}
 onChange={change} 
/>
</div>
<button  className= "mt-4 bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition-all duration-300 " onClick={submit}>
Update Book
</button>
  </div>
  </div>
  )
}

export default UpdateBook