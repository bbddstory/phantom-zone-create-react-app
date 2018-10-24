import * as React from 'react';
import { connect } from 'react-redux';
import { toggleEditDetailsAct } from '../actions/uiActions';
import { watchLaterAct, recommAct, loadDetailsAct } from '../actions/detailsActions';
import Mousetrap from 'mousetrap';

import closedCap from '../images/details/baseline_closed_caption_white_24dp.png';
import imdb from '../images/details/imdb.svg';
import douban from '../images/details/douban.png';
import mtime from '../images/details/mtime.png';
import reel from '../images/posters/reel.png';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opts: false,
      recomm: false,
      title: '',
      comment: '',
      showComment: false
    }
    const { match: { params } } = this.props;
    this.props.loadDetailsDispatch(params.id, 'main');
  }

  componentDidMount() {
    Mousetrap.bind('f2', e => this.props.editDetailsDispatch(true, false));
  }

  componentWillUnmount() {
    Mousetrap.unbind('f2', e => this.props.editDetailsDispatch(true, false));
  }

  toggleRecomm() {
    this.setState({ recomm: !this.state.recomm });
  }
  
  friends = (vid) => {
    const { loginState } = this.props;
    let friends = [];
    
    for (let i = 0; i < loginState.friends.length; i++) {
      friends.push(
        <li key={i} onClick={e => this.props.recommDispatch(vid, loginState.friends[i].email)}>
          {loginState.friends[i].name}&nbsp;(<span>{loginState.friends[i].email}</span>)
        </li>
      )
    }
    
    return friends;
  }
  
  // commentFocus() {
  //   this.setState({ showComment: true });
  // }

  // cancelComment() {
  //   this.setState({ title: '', comment: '', showComment: false });
  // }

  // titleChange(e) {
  //   this.setState({ title: e.target.value });
  // }

  // commentChange(e) {
  //   this.setState({ comment: e.target.value });
  // }

  // submitComment() {
  //   if (this.state.title && this.state.comment) {
  //     let t = new Date();
  //     this.props.commentDispatch({
  //       [t.getTime()]: {
  //         time: t.getFullYear() + '.' + (t.getMonth() + 1) + '.' + t.getDate(),
  //         title: this.state.title,
  //         txt: this.state.comment,
  //         user: this.props.loginState.user
  //       }
  //     });
  //     this.cancelComment();
  //   }
  // }

  render() {
    const { recomm } = this.state;
    const item = this.props.dataState.details.main;

    if (item) {
      return (
        <React.Fragment>
          <div className="video-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A' ?
                <img alt="Poster" src={item.poster} /> : <img alt="No poster available" src={reel} />}
            </div>

            <div className="info">
              <span className="title">{item.eng_title}</span>
              <span className="orig-title">
                {item.orig_title === null || item.orig_title === '' || item.orig_title === 'N/A' || item.eng_title === item.orig_title ?
                  '' : item.orig_title + ' (original title)'}
              </span>
              <span className="misc">
                Type: Adventure, History<br />
                Year: {item.year}<br />
                Runtime: {item.runtime || 'N/A'}<br />
                {item.director && item.director !== 'null' ? 'Directors: ' + (item.director || 'N/A') : 'Creators: ' + (item.creator || 'N/A')}<br />
                Stars: {item.stars || 'N/A'}<br />
                Language: English
              </span>
              <div className="actions">
                <div className="watch-later" title="Watch later" onClick={e => this.props.watchLaterDispatch(item.id)}></div>
                <div className="recomm" title="Recommend to friends" onClick={e => this.toggleRecomm()}></div>
                <a target="_blank" title="Search for subtitles on Subscene" href={'https://subscene.com/subtitles/title?q=' + item.eng_title.replace(' ', '+')}>
                  <img src={closedCap} alt="CC" />
                </a>
                <div className="edit" title="Edit details" onClick={e => this.props.editDetailsDispatch(true, false)}></div>
                {recomm && <ul className={recomm ? 'fade-in' : ''}>{this.friends(item.id)}</ul>}
              </div>
            </div>

            <div className="plot">
              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a target="_blank" title="Search on IMDB" href={item.imdb ?
                  'http://www.imdb.com/title/' + item.imdb : 'https://www.imdb.com/find?ref_=nv_sr_fn&q=' + item.eng_title.replace(' ', '+')}>
                  <img src={imdb} className="imdb" alt="IMDB Link" />
                </a>
                <a target="_blank" title="Search on Douban" href={item.douban ?
                  'https://movie.douban.com/subject/' + item.douban : 'https://movie.douban.com/subject_search?search_text=' + item.eng_title.replace(' ', '+')}>
                  <img src={douban} className="douban" alt="Douban Link" />
                </a>
                <a target="_blank" title="Search on Mtime" href={item.mtime ?
                  'http://movie.mtime.com/' + item.mtime : 'http://search.mtime.com/search/?q=' + item.eng_title}>
                  <img src={mtime} className="mtime" alt="Mtime Link" />
                </a>
              </div>
            </div>
          </div>

          <h1>Video Specs</h1>
          <div className="tech-specs">
            <span>File Name:</span>[TMD]_Shikabane_Hime_Kuro_-_01_[H264-720p][008210E4].mkv<br />

            <div className="tech-details">
              <div>
                <span>Format:</span>mkv / mp4 / avi<br />
                <span>File Size:</span>1.5GB<br />
              </div>
              <div>
                <span>Resolution:</span>1920 x 1280<br />
                <span>Color:</span>Color / Black and White<br />
              </div>
              <div>
                <span>Video Codec:</span>h264 / h265<br />
                <span>Audio Codec:</span>aac / ac3 / dts
              </div>
            </div>
          </div>

          <h1>Trailer and featurette</h1>
          <div className="videos">
            {item.trailer === 'null' || item.trailer === '' || item.trailer === null ?
              <div className="no-video">No video</div> : <iframe title="trailer" width="49%" height="275" 
              src={'https://www.youtube.com/embed/' + item.trailer + '?rel=0&amp;showinfo=0'} frameBorder="0" allowFullScreen></iframe>}
            {item.trailer === 'null' || item.trailer === '' || item.trailer === null ?
              <div className="no-video">No video</div> : <iframe title="featurette" width="49%" height="275" 
              src={'https://www.youtube.com/embed/' + item.featurette + '?rel=0&amp;showinfo=0'} frameBorder="0" allowFullScreen></iframe>}
          </div>
          <div className="youtube-lnk">
            <a target="_blank" href={'https://www.youtube.com/results?search_query=' + item.eng_title}>More videos on YouTube</a>
          </div>

          {/* <h1>Comments</h1>

          <div className="add-comment">
            <input className={showComment ? "comment-title" : "comment-title-lt"} type="text" placeholder={showComment ? "Title" : "Add a public comment..."} value={this.state.title} onChange={e => this.titleChange(e)} onFocus={e => this.commentFocus()} />
            {showComment && <textarea placeholder="Add a public comment..." value={this.state.comment} onChange={e => this.commentChange(e)}></textarea>}
            {showComment && <div>
              <button className="btn-cancel" onClick={e => this.cancelComment()}>Cancel</button>
              <button className="btn-main" type="submit" onClick={e => this.submitComment()}>Publish</button>
            </div>}
          </div> */}

          {/* {item.comments && Object.keys(item.comments).map((id) => {
            return <div className="comment" key={id}>
              <div className="title-row">
                {item.comments[id].user === loginState.user && <div className="del-comment" onClick={e => this.props.delCommentDispatch(id)}></div>}
                <div>
                  <h2>{item.comments[id].title}</h2>
                  <h4>{item.comments[id].time} by {item.comments[id].user}</h4>
                </div>
              </div>
              <span>{item.comments[id].txt}</span>
            </div>
          })} */}
        </React.Fragment>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (store) => ({
  loginState: store.loginReducer,
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
  watchLaterDispatch: (id) => dispatch(watchLaterAct(id)),
  recommDispatch: (vid, friendEmail) => dispatch(recommAct(vid, friendEmail)),
  // commentDispatch: (values) => dispatch(commentAct(values)),
  // delCommentDispatch: (id) => dispatch(delCommentAct(id)),
  editDetailsDispatch: (status, newRec) => dispatch(toggleEditDetailsAct(status, newRec)),
  loadDetailsDispatch: (key, list) => dispatch(loadDetailsAct(key, list, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);