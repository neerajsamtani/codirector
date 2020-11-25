import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';

export default ({ id, data }) => {

  const [link, setLink] = useState(data.value)
  const [thumbnail, setThumbnail] = useState(<div>{data.label}</div>)

  // TODO: Validate link to get video
  // TODO: Only allow one outgoing connection per video
  const getThumbnail = (event) => {
    event.preventDefault()
    const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const videoIdArray = link.match(VID_REGEX) // videoId is element [1] of this array
    if (videoIdArray) {
      const videoId = `https://img.youtube.com/vi/${videoIdArray[1]}/mqdefault.jpg`
      setThumbnail(<img draggable="false" src={videoId} width="192" height="108" />)
    }
    else {
      setThumbnail(`Video Node`)
      setLink(``)
      alert("Please enter a valid youtube link.")
    }
  }

  const handleLinkChange = (event) => {
    data.onChange(id, event)
    setLink(event.target.value)
  }

  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      {thumbnail}
      <form onSubmit={getThumbnail}>
        <input 
          value={link}
          onChange={handleLinkChange}
        />
        {/* <button type="submit">Submit</button> */}
      </form>
      <Handle type="source" position="right" id="a" style={{ background: '#555' }} />
    </>
  );
}