import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

import {useState ,useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { toast } from "sonner"
import { getFilePreview, uploadFile } from '@/lib/appwrite/uploadImage';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate()
 
  const [file, setFile] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({})
  console.log(formData)

  const[createPostError, setCreatePostError] = useState(null)
  
  const handleUploadImage = async()=>{
    try{
      if(!file){
        setImageUploadError("Please select an image!!")
         toast.error("Please select an image!")
         return
      }
  
      setImageUploading(true)
      setImageUploadError(null)

      const uploadedFile = await uploadFile(file)
      console.log("Uploaded File:", uploadedFile);

      const postImageUrl = await getFilePreview(uploadedFile.$id)
      console.log("Post Image URL:", postImageUrl);
console.log("Image URL Type:", typeof postImageUrl);

      setFormData({...formData, image:postImageUrl})

      toast.success("Image uploaded successfully!")

      if(postImageUrl){
        setImageUploading(false)
      }
    }catch(error){
      setImageUploadError("Image upload failed")
      console.log(error)
       toast.error("Image upload failed")
       setImageUploading(false)
    }
  }

const editorRef = useRef(null)
const quillRef = useRef(null)
const [value, setValue] = useState('')

useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      placeholder: 'Write your post content...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: [1, 2, 3, false] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    })

     quillRef.current = quill

    quill.on('text-change', () => {
  setFormData(prev => ({
    ...prev,
    content: quill.root.innerHTML
  }))
})

    return () => {
      quillRef.current = null
    }
  }, [])

  // const handleSubmit= async(e)=>{
  //   e.preventDefault()
  //   try{
  //     const res = await fetch("/api/post/create",{
  //       method:"POST",
  //       headers:{"Content-Type":"application/json"},
  //       body:JSON.stringify(formData),
  //     })
  //     const data = await res.json()

  //     if(!res.ok){
  //       toast.error("Something went wrong! Please try again.")
  //       setCreatePostError(data.message)
  //       return
  //     }

  //     if(res.ok){
  //       toast.success("Article Published Successfully!!")
  //       setCreatePostError(null)
  //       navigate(`/post/${data.slug}`)
  //     }
  //   }catch(error){
  //     toast.error("Something went wrong! Please try again.")
  //       setCreatePostError("Something went wrong! Please try again.")
  //   }
  // }


  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.message || "Something went wrong!")
      setCreatePostError(data.message)
      return
    }

    toast.success("Article Published Successfully!")
    setCreatePostError(null)

    navigate(`/post/${data.slug}`)
  } catch (error) {
    console.error(error)
    toast.error("Something went wrong! Please try again.")
    setCreatePostError("Something went wrong! Please try again.")
  }
}

  //

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold text-slate-700'>
        Create a post
      </h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <Input 
            type="text" 
            placeholder="title"
            required
            id='title'
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            // onChange={(e)=>setFormData({...formData, title: e.target.value})}
            onChange={(e) =>
  setFormData(prev => ({
    ...prev,
    title: e.target.value
  }))
}
            />

            <Select 
            // onValueChange={(value)=>setFormData({...formData, category:value})}
            onValueChange={(value) =>
  setFormData(prev => ({
    ...prev,
    category: value
  }))
}
            >
                <SelectTrigger className='w-full sm:w-1/4 h-12! min-h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'>
                <SelectValue placeholder="Select a Category"/>
                </SelectTrigger>

                <SelectContent>
        <SelectGroup >
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="worldnews">World News</SelectItem>
          <SelectItem value="sportsnews">Sports News</SelectItem>
          <SelectItem value="localnews">Local News</SelectItem>
        </SelectGroup>
      </SelectContent>
            </Select>
            </div>

            <div className='flex gap-4 items-center justify-between border-4 border-slate-600 border-dotted p-3'>
                <input 
                type="file" 
                accept='image/*'
                onChange={(e)=>setFile(e.target.files[0])} />
                <Button 
                type="button" 
                className="bg-slate-700" 
                onClick={handleUploadImage}>
                  {imageUploading ? "Uploading..." : "Upload Image"}
                  </Button>
            </div>

            {imageUploadError && <p className='text-red-600'>{imageUploadError}</p>}

            { formData.image && (
              <img 
              src={formData.image} 
              alt="upload"
              className='w-full h-72 object-cover' />
            )}

            <div ref={editorRef} className="min-h-72" />

            <Button 
            type="submit" 
            className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md">Submit</Button>

            {createPostError && (
              <p className='text-red-600 mt-5'>{createPostError}</p>
            )}
      </form>
    </div>
  )
}

export default CreatePost
