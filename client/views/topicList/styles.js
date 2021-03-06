export const topicPrimaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: '#555',
  },
  tab: {
    backgroundColor: theme.palette.gray,
    textAlign: 'center',
    display: 'inline-block',
    padding: '0 6px',
    color: '#999',
    borderRadius: 3,
    marginRight: 10,
    fontSize: '12px',
    flexShrink: 0,
  },
  good: {
    backgroundColor: theme.palette.accent[600],
  },
  top: {
    backgroundColor: theme.palette.green,
    color: '#fff',
  },
})

export const topicSecondaryStyle = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
    flexWrap: 'wrap',
  },
  count: {
    textAlign: 'center',
    marginRight: 20,
  },
  userName: {
    marginRight: 20,
    color: '#9e9e9e',
  },
  accentColor: {
    color: theme.palette.green,
  },
})

export const topicListStyle = () => ({
  root: {
    margin: 24,
    marginTop: 80,
  },
  loading: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})
