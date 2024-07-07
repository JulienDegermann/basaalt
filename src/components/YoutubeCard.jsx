// dependencies
import PropTypes from 'prop-types';

export default function YoutubeCard({ video }) {
  return (



    <a className='youtube-card' href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
      <div className="text">

        <h3>{video.snippet.title}</h3>
        {/* <p>{video.snippet.description}</p> */}
      </div>
    </a>

  )
}

YoutubeCard.propTypes = {
  video: PropTypes.object.isRequired
}