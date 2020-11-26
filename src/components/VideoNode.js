import React, { memo, useState } from 'react';
import { Handle } from 'react-flow-renderer';
import parse from 'html-react-parser'

import {database} from './Canvas'

// TODO: Allow to select project
const projectId = "WeLImpeRjuSEThIeRNIC"

export default ({ id, data }) => {

  const [link, setLink] = useState(data.value)
  const [thumbnail, setThumbnail] = useState(data.thumbnail)

  // TODO: Validate link to get video
  // TODO: Only allow one outgoing connection per video
  const getThumbnail = (event) => {
    event.preventDefault()
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const videoIdArray = link.match(VID_REGEX) // videoId is element [1] of this array
    if (videoIdArray) {
      const videoId = `https://img.youtube.com/vi/${videoIdArray[1]}/mqdefault.jpg`
      const newThumbnail = `<img draggable='false' src=${videoId} width='192' height='108' />`
      database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/thumbnail/").set(newThumbnail)
      .then(setThumbnail(newThumbnail))
    }
    else {
      // Invalid Link
      // Empty out Thumbnail and Link and alert user
      database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/thumbnail/").set("")
        .then(setThumbnail(""))
      database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/value/").set("")
        .then(setLink(""))
      alert("Please enter a valid youtube link.")
    }
  }

  const handleLinkChange = (event) => {
    // TODO: Update elements array
    database.ref('projects/' + projectId + "/elements/" + (id-1) + "/data/value/").set(event.target.value)
    .then(setLink(event.target.value))
  }

  return (
    <>
    <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
      />
      <form onSubmit={getThumbnail}>
      {parse(data.label)}
      <br />
      {parse(thumbnail)}
      <br />
        <input 
          value={link}
          onChange={handleLinkChange}
          placeholder="Youtube Video Link"
        />
        {/* <button type="submit">Submit</button> */}
      </form>
      <Handle 
        type="source" 
        position="right"
        style={{ background: '#555' }} 
      />
    </>
  );
}