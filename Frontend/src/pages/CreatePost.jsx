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

const CreatePost = () => {
 
  const [file, setFile] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [imageUploading, setImageUploading] = useState(false)

  const [formData, setFormData] = useState({})
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
      const postImageUrl = getFilePreview(uploadedFile.$id)

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
      setValue(quill.root.innerHTML)
    })

    return () => {
      quillRef.current = null
    }
  }, [])

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold text-slate-700'>
        Create a post
      </h1>

      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <Input 
            type="text" 
            placeholder="title"
            required
            id='title'
            className="w-full sm:w-3/4 h-12 border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"/>

            <Select >
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

            <Button type="submit" className="h-12 bg-green-600 font-semibold max-sm:mt-5 text-md">Submit</Button>
      </form>
    </div>
  )
}

export default CreatePost
