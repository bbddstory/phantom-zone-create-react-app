import * as React from 'react';
import { connect } from 'react-redux';
import { toggleEditDetailsAct } from '../actions/uiActions';
import { watchLaterAct, recommAct, commentAct, delCommentAct } from '../actions/detailsActions';

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
        <li key={i} onClick={e => this.props.recommDispatch(vid, loginState.friends[i].email)}>
          {loginState.friends[i].name}&nbsp;(<span>{loginState.friends[i].email}</span>)
        </li>
      )
    }

    return friends;
  }

  render() {
    // const { loginState, dataState, uiState } = this.props;
    // const key = this.props.dataState.key;
    // const { opts } = this.state;
    const { recomm, showComment } = this.state;
    const item = this.props.dataState.mainDetails;

    if (item) {
      return (
        <React.Fragment>
          <div className="video-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A' ?
                <img alt="Poster" src={item.poster} /> :
                <div className={'dummy-poster poster-' + item.category.toLowerCase()}></div>}
            </div>

            <div className="info">
              <span className="title">{item.eng_title}</span>
              <span className="orig-title">
                {item.orig_title === null || item.orig_title === '' || item.orig_title === 'N/A' || item.eng_title === item.orig_title ?
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
                <div className="edit" title="Edit details" onClick={e => this.props.editDetailsDispatch(true, false)}></div>
                <a target="_blank" title="Search for subtitles on Subscene" href={'https://subscene.com/subtitles/title?q=' + item.eng_title.replace(' ', '+')}></a>
                {recomm && <ul>{this.friends(item.id)}</ul>}
              </div>
            </div>

            <div className="plot">
              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a className="imdb" target="_blank" title="Search on IMDB" href={item.imdb_id ?
                  'http://www.imdb.com/title/' + item.imdb_id :
                  'https://www.imdb.com/find?ref_=nv_sr_fn&q=' + item.eng_title.replace(' ', '+')}></a>
                <a className="douban" target="_blank" title="Search on Douban" href={item.douban ?
                  'https://movie.douban.com/subject/' + item.douban :
                  'https://movie.douban.com/subject_search?search_text=' + item.eng_title.replace(' ', '+')}></a>
                <a className="mtime" target="_blank" title="Search on Mtime" href={item.mtime ?
                  'http://movie.mtime.com/' + item.mtime :
                  'http://search.mtime.com/search/?q=' + item.eng_title}></a>
              </div>
            </div>
          </div>

          {item.trailer && <div>
            <h1>Trailer and featurette</h1>
            <div className="trailer">
              <iframe title="trailer" width="49%" height="275" src={item.trailer} frameBorder="0" allowFullScreen></iframe>
              <iframe title="featurette" width="49%" height="275" src={item.featurette} frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="youtube">
              <a target="_blank" href={'https://www.youtube.com/results?search_query=' + item.eng_title}>More videos on YouTube</a>
            </div>
          </div>}

          <h1>Comments</h1>

          <div className="add-comment">
            <input className={showComment ? "comment-title" : "comment-title-lt"} type="text" placeholder={showComment ? "Title" : "Add a public comment..."} value={this.state.title} onChange={e => this.titleChange(e)} onFocus={e => this.commentFocus()} />
            {showComment && <textarea placeholder="Add a public comment..." value={this.state.comment} onChange={e => this.commentChange(e)}></textarea>}
            {showComment && <div>
              <button className="btn-cancel" onClick={e => this.cancelComment()}>Cancel</button>
              <button className="btn-main" type="submit" onClick={e => this.submitComment()}>Publish</button>
            </div>}
          </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Details);