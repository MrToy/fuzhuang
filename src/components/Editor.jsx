import React,{Component} from "react"
import Radium from 'radium'
import {Editor, EditorState,RichUtils,convertToRaw,AtomicBlockUtils,Entity,convertFromRaw} from 'draft-js'
import Button from '../lib/Button'
import ButtonGroup from '../lib/ButtonGroup'
import Icon from '../lib/Icon'
import FileModalButton from './FileModalButton'
import Popover from '../lib/Popover'
import {SketchPicker} from 'react-color'

@Radium
class ControlButton extends Component{
	render(){
		var {editorState,type,onChange,onFocus} = this.props
		var active=false
		var onToggle=null
		if(["header-one","header-two","header-three","header-four","header-five","header-six","blockquote","unordered-list-item","ordered-list-item","code-block"].indexOf(type)>-1){
			var selection = editorState.getSelection()
			var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()
			active=type===blockType
			onToggle=e=>{
				e.preventDefault()
				onChange(RichUtils.toggleBlockType(editorState,type))
				onFocus()
			}
		}else{
			var currentStyle = editorState.getCurrentInlineStyle()
			active=currentStyle.has(type)
			onToggle=e=>{
				e.preventDefault()
				onChange(RichUtils.toggleInlineStyle(editorState,type))
				onFocus()
			}
		}
		return (
			<Button active={active} style={[{marginRight:0},this.props.style]} onMouseDown={onToggle} >
				{this.props.children}
			</Button>
		)
	}
}
export default class extends Component{
	state={editorState:this.props.value&&this.props.value.raw?EditorState.createWithContent(convertFromRaw(this.props.value.raw)):EditorState.createEmpty(),color:"#fff",styleMap:this.props.value&&this.props.value.style?this.props.value.style:{}}
	componentWillReceiveProps(props){
		if(props.readOnly)
	    	this.setState({editorState:props.value&&props.value.raw?EditorState.createWithContent(convertFromRaw(props.value.raw)):EditorState.createEmpty(),styleMap:props.value&&props.value.style?props.value.style:{}})  
	}
	onChange(editorState){
		this.setState({editorState})
		var data={style:this.state.styleMap,raw:convertToRaw(editorState.getCurrentContent())}
       	this.props.onChange&&this.props.onChange(data)
	}
	onColor(color){
		color='rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')'
		var {styleMap,editorState}=this.state
		styleMap[color]={color}
		this.setState({styleMap,color})
		this.onChange(RichUtils.toggleInlineStyle(editorState,color))
	}
	onMedia(src){
		const entityKey = Entity.create("image", 'MUTABLE', {src})
		var state=AtomicBlockUtils.insertAtomicBlock(this.state.editorState,entityKey,' ')
		this.onChange(state)
	}
	mediaBlockRenderer(block){
		const Media = (props) => {
			const entity = Entity.get(props.block.getEntityAt(0))
        	const {src} = entity.getData()
        	const type = entity.getType()
        	let media
	        if (type === 'audio') {
				media = <audio controls src={src} />
			} else if (type === 'image') {
				media = (
					<div style={{textAlign:"center"}}>
						<img src={src} style={{verticalAlign:"bottom",maxWidth:"100%"}} />
					</div>
				)
	        } else if (type === 'video') {
				media = <video controls src={src} />
	        }
			return media;
		}
		if (block.getType() === 'atomic') {
			return {component: Media,editable: false}
        }
        return null;
	}
	render(){
		var config={editorState:this.state.editorState,onChange:this.onChange.bind(this),onFocus:()=>this.refs.editor.focus()}
		return (
			<div style={{border:this.props.readOnly?"none":"1px dashed #CCC",marginTop:10,padding:10,...this.props.style}}>
				<style>{`.DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content{height:inherit;text-align:initial}.DraftEditor-root{position:relative}.DraftEditor-editorContainer{background-color:rgba(255,255,255,0);border-left:.1px solid transparent;position:relative;z-index:1}.public-DraftEditor-block{position:relative}.DraftEditor-alignLeft .public-DraftStyleDefault-block{text-align:left}.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root{left:0;text-align:left}.DraftEditor-alignCenter .public-DraftStyleDefault-block{text-align:center}.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root{margin:0 auto;text-align:center;width:100%}.DraftEditor-alignRight .public-DraftStyleDefault-block{text-align:right}.DraftEditor-alignRight .public-DraftEditorPlaceholder-root{right:0;text-align:right}.public-DraftEditorPlaceholder-root{color:#9197a3;position:absolute;z-index:0}.public-DraftEditorPlaceholder-hasFocus{color:#bdc1c9}.DraftEditorPlaceholder-hidden{display:none}.public-DraftStyleDefault-block{position:relative;white-space:nowrap}.public-DraftStyleDefault-ltr{direction:ltr;text-align:left}.public-DraftStyleDefault-rtl{direction:rtl;text-align:right}.public-DraftStyleDefault-listLTR{direction:ltr}.public-DraftStyleDefault-listRTL{direction:rtl}.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul{margin:16px 0;padding:0;padding-left:150px}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR{margin-left:1.5em}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL{margin-right:1.5em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR{margin-left:3em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL{margin-right:3em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR{margin-left:4.5em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL{margin-right:4.5em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR{margin-left:6em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL{margin-right:6em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR{margin-left:7.5em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL{margin-right:7.5em}.public-DraftStyleDefault-unorderedListItem{list-style-type:none;width:300px;display:inline-block;position:relative}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0{list-style-type:disc}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1{list-style-type:circle}.public-DraftStyleDefault-orderedListItem{position:relative}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before{left:-36px;position:absolute;text-align:right;width:30px}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before{position:absolute;right:-36px;text-align:left;width:30px}.public-DraftStyleDefault-orderedListItem:before{content:counter(ol0) ". ";counter-increment:ol0}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before{content:counter(ol1) ". ";counter-increment:ol1}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before{content:counter(ol2) ". ";counter-increment:ol2}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before{content:counter(ol3) ". ";counter-increment:ol3}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before{content:counter(ol4) ". ";counter-increment:ol4}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset{counter-reset:ol0}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset{counter-reset:ol1}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset{counter-reset:ol2}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset{counter-reset:ol3}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset{counter-reset:ol4}`}</style>
				{!this.props.readOnly&&(
					<div>
						<div style={{border:"1px solid #eee",display:"inline-block",marginRight:20,marginBottom:10}}>
							<ControlButton type="header-one" {...config}>H1</ControlButton>
							<ControlButton type="header-two" {...config}>H2</ControlButton>
							<ControlButton type="header-three" {...config}>H3</ControlButton>
							<ControlButton type="header-four" {...config}>H4</ControlButton>
							<ControlButton type="header-five" {...config}>H5</ControlButton>
							<ControlButton type="header-six" {...config}>H6</ControlButton>
							<ControlButton type="blockquote" {...config}><Icon name="format_quote" /></ControlButton>
							<ControlButton type="unordered-list-item" {...config}><Icon name="format_list_bulleted" /></ControlButton>
							<ControlButton type="ordered-list-item" {...config}><Icon name="format_list_numbered" /></ControlButton>
							<ControlButton type="code-block" {...config}>{'{}'}</ControlButton>
						</div>
						<div style={{border:"1px solid #eee",display:"inline-block",marginRight:20,marginBottom:10}}>
							<ControlButton type="BOLD" {...config}><strong>B</strong></ControlButton>
							<ControlButton type="ITALIC" {...config}><em>I</em></ControlButton>
							<ControlButton type="UNDERLINE" {...config}><u>U</u></ControlButton>
							<ControlButton type="CODE" {...config}>m</ControlButton>
						</div>
						<div style={{border:"1px solid #eee",display:"inline-block",marginRight:20,marginBottom:10}}>
							<Popover content={<SketchPicker color={this.state.color} onChange={this.onColor.bind(this)} />}>
								<Button style={{marginRight:0}}><Icon name="colorize" /></Button>
							</Popover>
							<FileModalButton noBar style={{marginRight:0}} onConfirm={data=>this.onMedia(data.path)} onClick={()=>this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}><Icon name="image" /></FileModalButton>
						</div>
					</div>
				)}
				<Editor {...config} readOnly={this.props.readOnly} blockRendererFn={this.mediaBlockRenderer} customStyleMap={this.state.styleMap} placeholder={(this.props.readOnly||this.state.editorState.getCurrentContent().getBlockMap().first().getType()!== 'unstyled')?null:'请输入点什么...'} ref="editor" />
			</div>
		)
	}
}
