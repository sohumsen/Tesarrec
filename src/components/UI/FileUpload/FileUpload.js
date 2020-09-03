import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Tooltip, IconButton } from '@material-ui/core';
function MyDropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      console.log(reader)

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        props.setDescription(binaryStr)

      }

    //   reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Tooltip title="Upload file" placement="top" arrow>
        <span>
          <IconButton
            edge="end"
            aria-label="add"
          >
            <InsertDriveFileIcon />
          </IconButton>
        </span>
      </Tooltip>    </div>
  )
}
export default MyDropzone