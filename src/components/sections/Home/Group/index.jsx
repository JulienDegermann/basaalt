// contexts
import { useContext } from 'react'
import { GroupContext } from '../../../../hooks/useGroup'

import './styles.css'

// components
import Section from '../../../Section'
import HomeCard from '../../../HomeCard'

export default function Group() {

  const { band, bandMembers } = useContext(GroupContext)
  bandMembers.sort(() => Math.random() - 0.5)

  return (

    <Section
      id='group'
      title='Le groupe'
    >

        <p>
          {band.description}
        </p>



        {/* <div className="flex justify-between align-center"> */}
        <div id="homeCardWrapper">
          {
            bandMembers.map((bandMember, index) => {
              return (
                <HomeCard
                  firstName={bandMember.firstName}
                  role={bandMember.bandRole}
                  image={`${bandMember.firstName}.jpg`}
                  // image="basaalt.p ng"
                  key={index}
                />
              )
            })
          }
        </div>

    </Section>
  )
}

