import * as React from 'react';
import { connect } from 'react-redux';
import { removeHomeListItemAct } from '../actions/homeActions';
import { loadDetailsAct } from '../actions/detailsActions';

class SlidesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currPage: 0 };
    }

    delItem(e, key) {
        e.preventDefault();
        this.props.removeHomeListItemDispatch(this.props.list, key);
    }

    loadDetails(key, list, jump) {
        this.props.loadDetailsDispatch(key, list);

        if (jump) {
            window.location.hash = '#/main/details/' + key;
        }
    }

    showSlide = (i) => {
        this.setState({ currPage: i })
    }

    slides = () => {
        const buffer = this.props.dataRef;
        const ipp = this.props.ipp;
        const hidePage = { display: 'none' };
        const showPage = { display: 'block' };
        const tileStyle = { width: this.props.vertical ? '100%' : 'calc(' + 100 / ipp + '% - 20px)' };

        let slides = [];
        let page = [];

        for (let i = 0; i < Math.ceil(buffer.length / ipp); i++) {
            for (let j = 0; j < ipp; j++) {
                let el = buffer[j + i * ipp];

                if (el) {
                    page.push(
                        <div className="tile" key={j + i * ipp} style={tileStyle}>
                            <div className="thumbnail" onClick={e => this.loadDetails(el.id, this.props.list, !this.props.link)}>
                                {this.props.del && <div className="del-item" title="Remove from the list" onClick={e => this.delItem(e, el.id)}></div>}
                                {this.props.link && <div onClick={e => { e.stopPropagation(); this.loadDetails(el.id, 'main', true); }} className="link" title="Open full details"></div>}
                                {el.poster && el.poster !== 'N/A' ?
                                    <img alt="Poster" src={el.poster} /> :
                                    <div className={'dummy-poster poster-' + el.category.toLowerCase()}></div>}
                            </div>
                            {this.props.info && <div className="info">
                                <div className="title">{el.eng_title}</div>
                                <div className="details">
                                    <span className="year">{el.year}</span><br />
                                    {el.director || el.creator || el.prod}
                                </div>
                            </div>}
                        </div>
                    )
                }
            }

            slides.push(
                <div className="slide" style={this.state.currPage === i ? showPage : hidePage} key={i}>
                    {page}
                </div>
            );
            page = [];
        }

        return slides;
    }


    dots = () => {
        let dots = [];

        for (let i = 0; i < Math.ceil(this.props.dataRef.length / this.props.ipp); i++) {
            dots.push(<span className={this.state.currPage === i ? 'currDot' : ''} onClick={e => this.showSlide(i)} key={i}></span>)
        }

        return (
            <div className="dots">
                {dots}
            </div>
        );
    }

    componentWillMount() {
        if(this.props.load) {
            this.props.loadDetailsDispatch(this.props.dataRef[0].id, this.props.list);
        }
    }

    render() {
        return (
            <div className="tile-list">
                {this.slides()}
                {this.dots()}
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch) => ({
    loadDetailsDispatch: (key, list) => {
        dispatch(loadDetailsAct(key, list))
    },
    removeHomeListItemDispatch: (list, key) => {
        dispatch(removeHomeListItemAct(list, key))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SlidesList);
