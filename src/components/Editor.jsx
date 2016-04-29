import React,{Component} from "react"
import Radium from 'radium'
import {Editor, EditorState,RichUtils,convertToRaw} from 'draft-js'
import Button from '../lib/Button'
import ButtonGroup from '../lib/ButtonGroup'
import List2 from '../lib/IconMoon/List2'
import ListNumbered from '../lib/IconMoon/ListNumbered'
import QuotesRight from '../lib/IconMoon/QuotesRight'
import Unlink from '../lib/Linearicons/Unlink'
import Link from '../lib/Linearicons/Link'
import Image from '../lib/IconMoon/Image'
import Undo2 from '../lib/IconMoon/Undo2'
import Redo2 from '../lib/IconMoon/Redo2'
import Eyedropper from '../lib/IconMoon/Eyedropper'
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
	state={editorState: EditorState.createEmpty(),color:"#fff",colorMap:{}}
	onChange(editorState){
		this.setState({editorState})
	}
	onColor(color){
		console.log(color)
		color='rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')'
		var {colorMap,editorState}=this.state
		colorMap[color]={color}
		this.setState({colorMap,color})
		this.onChange(RichUtils.toggleInlineStyle(editorState,color))
	}
	render(){
		var config={editorState:this.state.editorState,onChange:this.onChange.bind(this),onFocus:()=>this.refs.editor.focus()}
		return (
			<div style={{border:"1px dashed #CCC",marginTop:10,padding:10}}>
				<style>{`.DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content{height:inherit;text-align:initial}.DraftEditor-root{position:relative}.DraftEditor-editorContainer{background-color:rgba(255,255,255,0);border-left:.1px solid transparent;position:relative;z-index:1}.public-DraftEditor-block{position:relative}.DraftEditor-alignLeft .public-DraftStyleDefault-block{text-align:left}.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root{left:0;text-align:left}.DraftEditor-alignCenter .public-DraftStyleDefault-block{text-align:center}.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root{margin:0 auto;text-align:center;width:100%}.DraftEditor-alignRight .public-DraftStyleDefault-block{text-align:right}.DraftEditor-alignRight .public-DraftEditorPlaceholder-root{right:0;text-align:right}.public-DraftEditorPlaceholder-root{color:#9197a3;position:absolute;z-index:0}.public-DraftEditorPlaceholder-hasFocus{color:#bdc1c9}.DraftEditorPlaceholder-hidden{display:none}.public-DraftStyleDefault-block{position:relative;white-space:pre-wrap}.public-DraftStyleDefault-ltr{direction:ltr;text-align:left}.public-DraftStyleDefault-rtl{direction:rtl;text-align:right}.public-DraftStyleDefault-listLTR{direction:ltr}.public-DraftStyleDefault-listRTL{direction:rtl}.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul{margin:16px 0;padding:0}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR{margin-left:1.5em}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL{margin-right:1.5em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR{margin-left:3em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL{margin-right:3em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR{margin-left:4.5em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL{margin-right:4.5em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR{margin-left:6em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL{margin-right:6em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR{margin-left:7.5em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL{margin-right:7.5em}.public-DraftStyleDefault-unorderedListItem{list-style-type:square;position:relative}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0{list-style-type:disc}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1{list-style-type:circle}.public-DraftStyleDefault-orderedListItem{position:relative}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before{left:-36px;position:absolute;text-align:right;width:30px}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before{position:absolute;right:-36px;text-align:left;width:30px}.public-DraftStyleDefault-orderedListItem:before{content:counter(ol0) ". ";counter-increment:ol0}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before{content:counter(ol1) ". ";counter-increment:ol1}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before{content:counter(ol2) ". ";counter-increment:ol2}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before{content:counter(ol3) ". ";counter-increment:ol3}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before{content:counter(ol4) ". ";counter-increment:ol4}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset{counter-reset:ol0}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset{counter-reset:ol1}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset{counter-reset:ol2}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset{counter-reset:ol3}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset{counter-reset:ol4}`}</style>
				<div style={{border:"1px solid #eee",display:"inline-block",marginRight:20,marginBottom:10}}>
					<ControlButton type="header-one" {...config}>H1</ControlButton>
					<ControlButton type="header-two" {...config}>H2</ControlButton>
					<ControlButton type="header-three" {...config}>H3</ControlButton>
					<ControlButton type="header-four" {...config}>H4</ControlButton>
					<ControlButton type="header-five" {...config}>H5</ControlButton>
					<ControlButton type="header-six" {...config}>H6</ControlButton>
					<ControlButton type="blockquote" {...config}><QuotesRight /></ControlButton>
					<ControlButton type="unordered-list-item" {...config}><List2 /></ControlButton>
					<ControlButton type="ordered-list-item" {...config}><ListNumbered /></ControlButton>
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
						<Button style={{marginRight:0}}><Eyedropper /></Button>
					</Popover>
					<Button style={{marginRight:0}} onClick={()=>this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}><Link /></Button>
					<Button style={{marginRight:0}} onClick={()=>this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}><Unlink /></Button>
					<FileModalButton noBar style={{marginRight:0}} onClick={()=>this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}><Image /></FileModalButton>
				</div>
				<div style={{border:"1px solid #eee",display:"inline-block",marginRight:20,marginBottom:10}}>
					<Button style={{marginRight:0}} onClick={()=>this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}><Undo2 /></Button>
					<Button style={{marginRight:0}} onClick={()=>this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))}><Redo2 /></Button>
				</div>
				<Editor {...config} customStyleMap={this.state.colorMap} placeholder={this.state.editorState.getCurrentContent().getBlockMap().first().getType()!== 'unstyled'?null:'请输入点什么...'} ref="editor" />
			</div>
		)
	}
}
