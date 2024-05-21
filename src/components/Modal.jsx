
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function Modal({
  text,
  title,
  show,
  type
}) {

  const [status, setStatus] = useState(true)

  const [popup, setPopup] = useState([
    {
      title: title,
      type: type,
      text: text
    },
    {
      title: title,
      type: type,
      text: text
    },
  ])

  useEffect(() => {
    setStatus(show)
  }, [show])

  console.log('status')
  console.log(status)
  function onClose() {
    setStatus(false)
  }
  if (!status) {
    return (
      <div className="modal">
        {popup.map((e, i) => {
          return (
            <div key={i} className={e.type}>
              <div className="modal-content">
                <div className="modal-header">
                  <h3>{e.title}</h3>
                  <button onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                  {e.children}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}


Modal.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
  show: PropTypes.bool,
  type: PropTypes.string.isRequired
}