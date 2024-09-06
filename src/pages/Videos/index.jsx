// dependecies
import { useContext, useState } from 'react';

// contexts
import { YoutubeContext } from '/src/hooks/useYoutube.jsx';

// components
import YoutubeCard from './YoutubeCard.jsx';
import FormInput from '/src/components/FormInput.jsx';
import Section from '/src/components/Section/index.jsx';

function Videos() {

  const videos = useContext(YoutubeContext)

  const [sort, setSort] = useState("last")

  const toggleSort = (e) => {
    setSort(e.target.value)
  }

  videos.sort((a, b) => {
    switch (sort) {
      case 'viewed':
        // viewCount not available in the API : sort bien title length
        return (a.snippet.title.length - b.snippet.title.length)
      case 'last':
        return (new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt))
    }
  })

  return (
    <>
      <Section
        id='videos'
        title='Nos clips'
      >
        <FormInput
          type="select"
          name="sort"
          id="video-sort"
          label="Trier :"
          onChange={e => toggleSort(e)}
          defaultValue={sort}
        >
          <option
            value="viewed"
          >
            les + populaires
          </option>
          <option
            // selected={sort === "last"}
            value="last"
          >
            les + récents
          </option>
        </FormInput>
        <div className="grid youtube">
          {
            videos.map((video, index) => (
              <YoutubeCard key={index} video={video} />
            ))
          }
        </div>
      </Section>
    </>
  )
}

export default Videos;
