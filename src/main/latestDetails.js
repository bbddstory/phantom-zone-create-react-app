import * as React from 'react';
import { connect } from 'react-redux';
import { toggleEditDetailsAct } from '../actions/uiActions';
import { watchLaterAct, recommAct, commentAct, delCommentAct } from '../actions/detailsActions';

import closedCap from '../images/details/baseline_closed_caption_white_24dp.png';
import imdb from '../images/details/imdb.svg';
import douban from '../images/details/douban.png';
import mtime from '../images/details/mtime.png';

class LatestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opts: false,
      recomm: false,
      title: '',
      comment: '',
      showComment: false
    }
  }

  toggleRecomm() {
    this.setState({ recomm: !this.state.recomm });
  }

  commentFocus() {
    this.setState({ showComment: true });
  }

  cancelComment() {
    this.setState({ title: '', comment: '', showComment: false });
  }

  titleChange(e) {
    this.setState({ title: e.target.value });
  }

  commentChange(e) {
    this.setState({ comment: e.target.value });
  }

  submitComment() {
    if (this.state.title && this.state.comment) {
      let t = new Date();
      this.props.commentDispatch({
        [t.getTime()]: {
          time: t.getFullYear() + '.' + (t.getMonth() + 1) + '.' + t.getDate(),
          title: this.state.title,
          txt: this.state.comment,
          user: this.props.loginState.user
        }
      });
      this.cancelComment();
    }
  }

  friends = (vid) => {
    const { loginState } = this.props;
    let friends = [];
    
    for (let i = 0; i < loginState.friends.length; i++) {
      friends.push(
        <li key={i} onClick={e => { this.props.recommDispatch(vid, loginState.friends[i].email); this.toggleRecomm()}}>
          {loginState.friends[i].name}&nbsp;(<span>{loginState.friends[i].email}</span>)
        </li>
      )
    }

    return friends;
  }

  render() {
    // const { loginState, dataState, uiState } = this.props;
    // const key = this.props.dataState.key;
    const { recomm } = this.state;
    const item = this.props.dataState.latestDetails;

    if (item) {
      return (
        <React.Fragment>
          <div className="latest-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A' ?
                <img alt="Poster" src={item.poster} /> :
                <div className={'dummy-poster poster-' + item.category.toLowerCase()}></div>}
            </div>

            <div className="info">
              <span className="title">{item.eng_title}</span>
              <span className="orig-title">
                {item.orig_title === null || item.orig_title === '' || item.orig_title === 'N/A'|| item.orig_title === 'null' || item.eng_title === item.orig_title ?
                  '' : item.orig_title + ' (original title)'}
              </span>
              <span className="misc">
                Year: {item.year}<br />
                Runtime: {item.runtime || 'N/A'}<br />
                {item.director ? 'Director: ' + (item.director || 'N/A') : 'Creator: ' + (item.creator || 'N/A')}<br />
                Stars: {item.stars || 'N/A'}
              </span>
              <div className="actions">
                <div className="watch-later" title="Watch later" onClick={e => this.props.watchLaterDispatch(item.id)}></div>
                <div className="recomm" title="Recommend to friends" onClick={e => this.toggleRecomm()}></div>
                {/* <div className="edit" title="Edit details" onClick={e => this.props.editDetailsDispatch(true, false)}></div> */}
                <a target="_blank" title="Search for subtitles on Subscene" href={'https://subscene.com/subtitles/title?q=' + item.eng_title.replace(' ', '+')}>
                  <img src={closedCap} className="closed-cap" alt="CC" onClick={e => this.toggleRecomm()} />
                </a>
                {recomm && <ul>{this.friends(item.id)}</ul>}
              </div>
            </div>

            <div className="plot">
              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a target="_blank" title="Search on IMDB" href={item.imdb_id ?
                  'http://www.imdb.com/title/' + item.imdb_id : 'https://www.imdb.com/find?ref_=nv_sr_fn&q=' + item.eng_title.replace(' ', '+')}>
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
          {item.trailer ? <div className="latest-trailer">
            <iframe title="trailer" width="224" height="125" src={item.trailer} frameBorder="0" allowFullScreen></iframe>
            <iframe title="featurette" width="224" height="125" src={item.featurette} frameBorder="0" allowFullScreen></iframe>
          </div> : <div className="no-vid-latest">No videos</div>}
        </React.Fragment>
      )
    } else {
      return ''
    }
  }
}

const mapStateToProps = (store) => ({
  loginState: store.loginReducer,
  dataState: store.dataReducer,
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch) => ({
  watchLaterDispatch: (id) => dispatch(watchLaterAct(id)),
  recommDispatch: (vid, friendEmail) => dispatch(recommAct(vid, friendEmail)),
  commentDispatch: (values) => dispatch(commentAct(values)),
  delCommentDispatch: (id) => dispatch(delCommentAct(id)),
  editDetailsDispatch: (status, newRec) => dispatch(toggleEditDetailsAct(status, newRec))
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestDetails);