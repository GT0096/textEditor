import React, { useState } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import Marker  from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';

const Editor = () => {

const onFileChange=(e)=> {
    if(e){
    const url = URL.createObjectURL(e)
    console.log("file is",url );
    return url;
    }else{
        console.log("No image");
    }
    
}

    const editor = new EditorJS({
        holder:'editorjs',
        tools : {
            header: {
                class: Header,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+H',
              },
            image:{
                class:ImageTool,
                config: {
                  uploader: {
                    uploadByFile(file){
                    return {
                        success:1,
                        file:{
                          url:onFileChange(file)
                        }
                        }
                    }
                  }
                }
              },
        // image: SimpleImage,
        embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            }
          },

          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          delimiter: Delimiter,
          warning: Warning,
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          code: CodeTool,
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },



        }
    })


 async   function  saveBtn() {
       await editor.save().then((outputData) => {
            console.log('Article data: ', outputData)
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
    }

  return (
    <div className='center'>
    <h1 className='text-5xl font-bold text-center top-10 blue'>MyEditor</h1>
       
      <div className='shadow-lg shadow-indigo-500/40 mx-2 my-6 px-2 py-6' id='editorjs' >
        </div>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type='click' onClick={saveBtn}>Save Article</button>
      
    </div>
  )
}

export default Editor
