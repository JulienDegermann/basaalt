// contexts
import { useContext } from 'react'
import { GroupContext } from '../../../hooks/useGroup'

// components
import Section from '../../Section'
import HomeCard from '../../HomeCard'

export default function Group() {

  const { band, bandMembers } = useContext(GroupContext)

  return (

    <Section
      id='group'
      title='Le groupe'
    >

        <p>
          {band.description}
        </p>



        {/* <div className="flex justify-between align-center"> */}
        <div>
          {
            bandMembers.map((bandMember, index) => {
              return (
                <HomeCard
                  firstName={bandMember.firstName}
                  role={bandMember.bandRole}
                  image="basaalt.png"
                  key={index}
                />
              )
            })
          }
        </div>

    </Section>
  )
}

