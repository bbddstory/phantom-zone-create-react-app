import * as React from 'react';
import { connect } from 'react-redux';
import { toggleEditDetailsAct } from '../actions/uiActions';
import { saveDetailsAct } from '../actions/detailsActions';
import cats from '../util/cats';

class EditDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        eng_title: '', orig_title: '',
        year: '', runtime: '',
        stars: '', director: '', creator: '',
        plot: '',
        imdb: '', rating: '', douban: '', mtime: '',
        trailer: '', featurette: '',
        status: '', cat: '',
        poster: '',
        subtitle: ''
      }
    }
  }

  onChange(e) {
    // console.log(e.target.name, e.target.value);
    
    this.setState({
      details: {
        ...this.state.details, [e.target.name]: e.target.value
      }
    });
  }

  onSubmit(e, values) {
    e.preventDefault();
    // console.log(this.state);

    if (true) {
      this.props.saveDetailsDispatch(values);
    }
  }

  // sleep(ms) {
  //   new Promise(resolve => setTimeout(resolve, ms))
  // };

  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  submitFn = async (values) => {
    await this.sleep(800); // simulate server latency
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  componentWillMount() {
    // let cp = Object.assign({}, this.props.dataState.mainDetails);
    this.setState({ details: Object.assign({}, this.props.dataState.mainDetails) });
  }

  render() {
    // Detect whether this is modifying an existing record or adding a new one
    let item;

    if (this.props.uiState.newRec) { // New record
      item = {}
    } else { // Existing record
      // let key = this.props.dataState.key;

      item = this.state.details;
    }

    // const d = this.state.details;

    return (
      <div className="popup-bg">
        <form onChange={(values) => this.onChange(values)} onSubmit={e => this.onSubmit(e, item)}>
          <div className="popup-panel">
            <div className="panel-body">

              <div className="flex">
                <div className="input-padding width-50">
                  <label>English Title</label>
                  <input type="text" name="eng_title" placeholder="N/A" defaultValue={item.eng_title} onChange={e => this.onChange(e)} />
                  {this.state.eng_title && <span>Contains invalid characters</span>}
                </div>
                <div className="input-padding width-50">
                  <label>Original Title</label>
                  <input type="text" name="orig_title" placeholder="N/A" defaultValue={item.orig_title} onChange={e => this.onChange(e)} />
                  {this.state.orig_title && <span>Contains invalid characters</span>}
                </div>
              </div>

              <div className="flex">
                <div className="input-padding flex width-50">
                  <div className="width-50" style={{ padding: '0 10px 0 0' }}>
                    <label>Year</label>
                    <input type="text" name="year" placeholder="N/A" defaultValue={item.year} onChange={e => this.onChange(e)} />
                    {this.state.year && <span>Must be 4 digits</span>}
                  </div>
                  <div className="width-50" style={{ padding: '0 0 0 10px' }}>
                    <label>Runtime</label>
                    <input type="text" name="runtime" placeholder="N/A" defaultValue={item.runtime} onChange={e => this.onChange(e)} />
                    {this.state.runtime && <span>Format: 1h 30min</span>}
                  </div>
                </div>

                <div className="input-padding width-50">
                  <label>Stars</label>
                  <input type="text" name="stars" placeholder="N/A" defaultValue={item.stars} onChange={e => this.onChange(e)} />
                  {this.state.director && <span>One or more names separated by comma</span>}
                </div>
              </div>

              <div className="flex">
                <div className="input-padding width-50">
                  <label>Director</label>
                  <input type="text" name="director" placeholder="N/A" defaultValue={item.director} onChange={e => this.onChange(e)} />
                  {this.state.director && <span>One or more names separated by comma</span>}
                </div>
                <div className="input-padding width-50">
                  <label>Creator</label>
                  <input type="text" name="creator" placeholder="N/A" defaultValue={item.creator} onChange={e => this.onChange(e)} />
                  {this.state.director && <span>One or more names separated by comma</span>}
                </div>
              </div>

              <div className="input-padding">
                <label className="textarea-lbl">Plot</label>
                <textarea name="plot" placeholder="N/A" defaultValue={item.plot} onChange={e => this.onChange(e)} />
                {this.state.plot && <span>Contains invalid characters</span>}
              </div>

              <div className="flex">
                <div className="input-padding width-25">
                  <label>IMDB ID</label>
                  <input type="text" name="imdb" placeholder="N/A" defaultValue={item.imdb} onChange={e => this.onChange(e)} />
                  {this.state.imdb && <span>Format: tt1234567</span>}
                </div>
                <div className="input-padding width-25">
                  <label>Rating</label>
                  <input type="text" name="rating" placeholder="N/A" defaultValue={item.rating} onChange={e => this.onChange(e)} />
                  {this.state.rating && <span>Format: 9.9</span>}
                </div>
                <div className="input-padding width-25">
                  <label>Douban</label>
                  <input type="text" name="douban" placeholder="N/A" defaultValue={item.douban} onChange={e => this.onChange(e)} />
                  {this.state.imdb_id && <span>Format: tt1234567</span>}
                </div>
                <div className="input-padding width-25">
                  <label>Mtime</label>
                  <input type="text" name="mtime" placeholder="N/A" defaultValue={item.mtime} onChange={e => this.onChange(e)} />
                  {this.state.rating && <span>Format: 9.9</span>}
                </div>
              </div>

              <div className="flex">
                <div className="input-padding width-25">
                  <label>Trailer</label>
                  <input type="text" name="trailer" placeholder="N/A" defaultValue={item.trailer} onChange={e => this.onChange(e)} />
                  {this.state.imdb_id && <span>Format: tt1234567</span>}
                </div>
                <div className="input-padding width-25">
                  <label>Featurette</label>
                  <input type="text" name="featurette" placeholder="N/A" defaultValue={item.featurette} onChange={e => this.onChange(e)} />
                  {this.state.rating && <span>Format: 9.9</span>}
                </div>
                <div className="input-padding width-25">
                  <label>Status</label>
                  <select name="status" defaultValue={item.status} onChange={e => this.onChange(e)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
                <div className="input-padding width-25">
                  <label>Category</label>
                  <select ref="catSel" name="cat" defaultValue={item.cat} disabled={!this.props.uiState.newRec} onChange={e => this.onChange(e)} >
                    <option value={cats.MOVIE}>Movie</option>
                    <option value={cats.TV}>TV</option>
                    <option value={cats.DOC}>Documentary</option>
                    <option value={cats.ANIME}>Animation</option>
                  </select>
                </div>
              </div>

              <div className="input-padding">
                <label>Poster</label>
                <textarea name="poster" className="poster" placeholder="N/A" defaultValue={item.poster} onChange={e => this.onChange(e)} />
                {this.state.poster && <span>Must be a valid URL</span>}
              </div>

              <div className="input-padding">
                <label>Subtitle</label>
                <input type="text" name="subtitle" placeholder="N/A" defaultValue={item.subtitle} onChange={e => this.onChange(e)} />
                {this.state.subtitle && <span>Must be a valid URL</span>}
              </div>

            </div>
            <div className="panel-footer">
              <button className="btn-cancel" onClick={e => this.props.editDetailsDispatch(false, false)}>Cancel</button>
              <button className="btn-main" type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  dataState: store.dataReducer,
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch) => ({
  editDetailsDispatch: (status, newRec) => {
    dispatch(toggleEditDetailsAct(status, newRec))
  },
  saveDetailsDispatch: (values) => {
    dispatch(saveDetailsAct(values))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
