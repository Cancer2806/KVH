import React, {useState} from 'react'

import MoonLoader from "react-spinners/MoonLoader";

export default function Loader() {
 
  const [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading text-center">


      <MoonLoader color='#000' loading={loading} css='' size={80} />
    </div>
  )
}
