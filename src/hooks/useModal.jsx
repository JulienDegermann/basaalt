// dependencies
import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ModalContext = createContext('')

export default function ModalContextProvider(
  { children }
) {

  const [status, setStatus] = useState(true)
  const [modals, setModals] = useState([])

  return (
    <ModalContext.Provider
      value={{
        status,
        setStatus,
        modals,
        setModals
      }}>
      <div className="modal">
        {modals.map((e, i) => {
          if (e.status) {
            return (
              <div key={i} className={e.type}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>{e.title}</h3>
                    <button onClick={() => { setModals([...modals, modals[i].status = false]) }} >X</button>
                  </div>
                  <div className="modal-body">
                    {e.children}
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
      {children}
    </ModalContext.Provider>
  )
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}