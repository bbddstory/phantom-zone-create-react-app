import * as React from 'react';
import { connect } from 'react-redux';
import { watchLaterAct, recommAct } from '../actions/detailsActions';

import closedCap from '../images/details/baseline_closed_caption_white_24dp.png';
import imdb from '../images/details/imdb.svg';
import douban from '../images/details/douban.png';
import mtime from '../images/details/mtime.png';
import reel from '../images/posters/reel.png';

class RecommDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opts: false,
      recomm: false,
      title: '',
      comment: '',
      showComment: false,
    };
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

  friends = (vid) => {
    const { props } = this;
    const { loginState } = props;
    const friends = [];

    loginState.friends.forEach((f, i) => {
      friends.push(
        <li key={f.email} onClick={e => props.recommDispatch(vid, f.email)}>
          {f.name}&nbsp;(<span>{f.email}</span>)
        </li>,
      );
    });

    return friends;
  }

  toggleRecomm() {
    const { recomm } = this.state;
    this.setState({ recomm: !recomm });
  }

  render() {
    const { recomm } = this.state;
    const { props } = this;
    const { dataState } = props;
    const { recomm: item } = dataState.details;

    if (item) {
      return (
        <React.Fragment>
          <div className="recomm-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A'
                ? <img alt="Poster" src={item.poster} /> : <img alt="Poster" src={reel} />}
            </div>

            <div className="info">
              <div className="details-wrap">
                <span className="title">{item.eng_title}</span>
                <span className="orig-title">
                  {item.orig_title === null || item.orig_title === '' || item.orig_title === 'N/A' || item.eng_title === item.orig_title
                    ? '' : `${item.orig_title} (original title)`}
                </span>
                <span className="misc">
                  Year: {item.year}<br />
                  Runtime: {item.runtime || 'N/A'}<br />
                  {item.director ? `Director: ${item.director || 'N/A'}` : `Creator: ${item.creator || 'N/A'}`}<br />
                  Stars: {item.stars || 'N/A'}
                </span>
                <div className="actions">
                  <div className="watch-later" title="Watch later" onClick={e => this.props.watchLaterDispatch(item.id)} />
                  <div className="recomm" title="Recommend to friends" onClick={e => this.toggleRecomm()} />
                  <a target="_blank" rel="noopener noreferrer" title="Search for subtitles on Subscene"
                    href={`https://subscene.com/subtitles/title?q=${item.eng_title.replace(' ', '+')}`}
                  >
                    <img src={closedCap} alt="CC" />
                  </a>
                  {recomm && <ul className={recomm ? 'fade-in' : ''}>{this.friends(item.id)}</ul>}
                </div>
              </div>

              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a target="_blank" rel="noopener noreferrer" title="Search on IMDB" href={item.imdb
                  ? `http://www.imdb.com/title/${item.imdb}` : `https://www.imdb.com/find?ref_=nv_sr_fn&q=${item.eng_title.replace(' ', '+')}`}
                >
                  <img src={imdb} className="imdb" alt="IMDB Link" />
                </a>
                <a target="_blank" rel="noopener noreferrer" title="Search on Douban" href={item.douban
                  ? `https://movie.douban.com/subject/${item.douban}` : `https://movie.douban.com/subject_search?search_text=${item.eng_title.replace(' ', '+')}`}
                >
                  <img src={douban} className="douban" alt="Douban Link" />
                </a>
                <a target="_blank" rel="noopener noreferrer" title="Search on Mtime" href={item.mtime
                  ? `http://movie.mtime.com/${item.mtime}` : `http://search.mtime.com/search/?q=${item.eng_title}`}
                >
                  <img src={mtime} className="mtime" alt="Mtime Link" />
                </a>
              </div>
            </div>

            {item.trailer ? (
              <div className="recomm-trailer">
                <iframe title="trailer" width="350" height="47.3%"
                  src={`https://www.youtube.com/embed/${item.trailer}?rel=0&amp;showinfo=0`} frameBorder="0" allowFullScreen
                />
                <iframe title="featurette" width="350" height="47.3%"
                  src={`https://www.youtube.com/embed/${item.featurette}?rel=0&amp;showinfo=0`} frameBorder="0" allowFullScreen
                />
              </div>) : <div className="no-vid-recomm">No videos</div>}
          </div>
        </React.Fragment>
      );
    }
    return '';
  }
}

const mapStateToProps = store => ({
  loginState: store.loginReducer,
  dataState: store.dataReducer,
});

const mapDispatchToProps = dispatch => ({
  watchLaterDispatch: id => dispatch(watchLaterAct(id)),
  recommDispatch: (vid, friendEmail) => dispatch(recommAct(vid, friendEmail)),
  // commentDispatch: (values) => dispatch(commentAct(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommDetails);