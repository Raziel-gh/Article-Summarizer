import React from 'react';
import { useState, useEffect } from 'react';
import {copy, linkIcon, loader, tick, forward } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article.js';

const Demo = () => {
    const [copied, setCopy] = useState("")

    const handleCopy = (copiedUrl)=>{
        setCopy(copiedUrl)
        navigator.clipboard.writeText(copiedUrl)
        setTimeout(()=>setCopy(false),2000)
    }
    const [allArticles, setAllArticles] = useState([])

    const [article, setArticle]=useState({
        url:'',
        summary:'',
    })

    const [getSummary, {error,isFetching}] = useLazyGetSummaryQuery();

    useEffect(()=>{

        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage);
        }
    },[])

    const handleSubmit = async (event) =>{

        event.preventDefault()
        const {data} = await getSummary({articleUrl: article.url})

        if(data?.summary){
            const newArticle = {...article, summary: data.summary}
        
        const updatedArticles = [newArticle,...allArticles]

        setAllArticles(updatedArticles)
        setArticle(newArticle);

        localStorage.setItem('articles', JSON.stringify(updatedArticles))

        console.log(allArticles)};
    };
  return (
    <section className='mt-16 w-full h-full flex max-w-xl' >
        <div className='w-full h-full flex flex-col mt-6 gap-3'>
            <form className='relative flex justify-center items-center' onSubmit={(event)=>{handleSubmit(event)}}>
                <img src={linkIcon} alt='linkIcon' className='absolute left-0 my-2 ml-3 w-5'></img>
                <input type='url' className='url_input peer' placeholder='Enter the URL' value={article.url} onChange={(e)=>setArticle({...article,url: e.target.value})} required></input>
                <button className="w-full submit_btn
                 peer-focus:border-gray-700
                 peer-focus:text-gray-500
                 "
                 type='submit'>
                    <img src={forward}/>
                </button>
            </form>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
        {allArticles.map((item,index)=>(
            <div key={`link-${index}`}
            onClick={()=>setArticle(item)}
            className='link_card'>
            
            <div className='copy_btn'>
                <img src={copied===item.url ? tick : copy}
                alt="copy_icon"
                onClick={()=>{
                    handleCopy(item.url)
                }}
                className='w-[30%] h-[30%] object-contain'/>
            </div>

                <p className='flex-1 font-satoshi
                text-gray-600 font-bold text-sm'>{item.url}</p>
        </div>
        ))}
        
        </div>
        

        <div className="my-10 max-w-full flex flex-col justify-center items-center">
         { 

              isFetching ? (
                        <img src={loader} alt="loader" className='w-20 h-20 object-contain'/>
                ):  error ? (
                     <p className='font-bold text-center text-black'>Something went wrong
                     <br />
                     <span className='text-red-600 font-inter font-bold'>{error?.data?.error}</span>
                     </p>
                ) : (
                        article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='text-bold font-inter text-2xl'>
                                Article <span className='font-satoshi text-2xl blue_gradient'>Summarized</span>
                            </h2>
                            <div className='summary_box flex flex-col'><p className='font-inter font-medium text-sm'>{article.summary}</p></div>
                        </div>
                            
                            )
                )
              
        }
        </div>
        </div>
    </section>
  )
}

export default Demo