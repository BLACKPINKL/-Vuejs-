export default {
  name: 'expand',
  functional: true,
  props: {
    column: {
      type: Object
    },
    row: {
      type: Object
    },
    index: Number,
    render: Function
  },
  render: (h, context) => {
    let prams = {
      row: context.props.row,
      index: context.props.index,
      column: context.props.column
    }
    return context.props.render(h, prams)
  }
}
