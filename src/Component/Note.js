import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import Addtonote from './Addtonote';
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addtonotereducer } from "../Reducer/reducer";
import { useEffect, useState } from 'react';
import { TitleupdatedActions, discriptionupdatedActions, deletedataActions } from "../Actions/Actions"
import axios from 'axios';

function Note() {

    const dispatch = useDispatch();

    const getdata = useSelector((state) => state.addtonotereducer.note);

    const [search,setsearch] = useState()

    const [updatenote, setUpdatenote]=useState()

    const [alldata,setalldata] = useState()

    const getData = async () => {
    const data = await axios.get(`http://localhost:8000/piyush`)
    setalldata(data.data)
    }   


    const searchdata = () => {

        let data = alldata;

        if (search) {
            data = data.filter((element) => element.Title.includes(search) || element.discription.includes(search))
            return data
        }
        else {
            return data
        }
    }
    
    useEffect(() => {
        getData()
        
    },[])   

    const btndelete =  async (e,id) => {
        e.preventDefault()
        await axios.delete(`http://localhost:8000/piyush/${id}`,)
    }

    const handelchangetitle = async (e,id,color) => {
        setUpdatenote({ ...updatenote, id:id, data:color,[e.target.name]:e.target.value })
        await axios.patch(`http://localhost:8000/piyush/${id}`,updatenote)
        await getData()
    }
    const handeldiscription = async (e,id,color) => {
        setUpdatenote({ ...updatenote, id:id, data:color,[e.target.name]:e.target.value })
        await axios.patch(`http://localhost:8000/piyush/${id}`, updatenote)
        await getData()
    }

        const clearscren = (e) => {
        e.preventDefault()
        setsearch('')

    }
    return (
        <div className="container">
            <div className="row">
                <h2>Notes</h2>
                <div className="col-12 mt-3">
                    <Form className="d-flex " >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 w-100"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                        />
                        <button variant="outline-success" className='button-s ms-auto' onClick={clearscren}>Clear</button>
                    </Form>
                </div>
            </div>

            <div className='card-note'>
                <div className='row'>
                    {
                        searchdata()?.map((data) =>
                            <div className="col-lg-4 mt-5" key={data.id}>
                                <div className='card-border' style={{ backgroundColor: data.color }}>
                                    <form>
                                        <div>
                                            <input type="text" 
                                                placeholder='Title'
                                                className='input input-text'
                                                name='Title'
                                                defaultValue={data.Title}
                                                onBlur={(e) => setUpdatenote("")}
                                                onChange={(e) => handelchangetitle(e, data.id, data.color)}
                                            />
                                        </div>
                                        <div>
                                            <textarea type="text"
                                                placeholder='Tack a note...'
                                                className='mt-3 input'
                                                name='discription'  
                                                rows="3"
                                                defaultValue={data.discription}
                                                onBlur={(e) => setUpdatenote("")}
                                                onChange={(e) => handeldiscription(e, data.id, data.color)}
                                            />
                                        </div>
                                        <div className='btndelete'>
                                            <button onClick={(e) => btndelete(e, data.id)}><MdOutlineDelete /></button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-cen ">
                    <div className='btnpos'>
                        <Addtonote notdata={getData()} />
                    </div>
                </div>
            </div>


        </div>



    )
}
export default Note;
