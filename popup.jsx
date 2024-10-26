import * as React from 'react'; 
import ReactDOM from 'react-dom'; 
import PropTypes from 'prop-types'; 
import { CssBaseline, Button, Typography, Box, LinearProgress, Slide, Fade, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // 导入 MUI 自带图标
import { createTheme, ThemeProvider } from '@mui/material/styles'; // 导入主题功能

const Quote = () => { 
  const quotes = [ 
    "只看见历史的你可是没办法改变命运的。", 
    "生生生生暗生始，死死死死冥死终", 
    "你在说什么呢。我作为永远的居住者，过去是无限的，所以呢。现在不高兴的话不就没有意义了吗？千年也好万年也好，没有什么比得上现在这一瞬间。", 
    "你不觉得寻找古屋很有意思吗？", 
    "对了，咲夜不想要不老不死吗？这样就能和我一直在一起了。", 
    "敢动一动我就射击了！说错了。敢射击我就要动了。立刻就动。" 
  ]; 
  
  const [quote, setQuote] = React.useState(quotes[Math.floor(Math.random() * quotes.length)]); 
  
  return ( 
    <Typography variant="body1" sx={{ color: 'text.primary', fontStyle: 'italic', marginBottom: 1 }}> 
      {quote} 
    </Typography> 
  ); 
};

function LinearProgressWithLabel(props) { 
  return ( 
    <Box sx={{ display: 'flex', alignItems: 'center' }}> 
      <Box sx={{ width: '100%', mr: 1 }}> 
        <LinearProgress variant="determinate" {...props} /> 
      </Box> 
      <Box sx={{ minWidth: 35 }}> 
        <Typography variant="body2" sx={{ color: 'text.secondary' }}> 
          {`${Math.round(props.value)}%`} 
        </Typography> 
      </Box> 
    </Box> 
  ); 
}

LinearProgressWithLabel.propTypes = { 
  value: PropTypes.number.isRequired, 
};

const Popup = () => { 
  const [refreshCount, setRefreshCount] = React.useState(0); 
  const [targetCount, setTargetCount] = React.useState(1000); 
  const [progress, setProgress] = React.useState(0); 
  const [showAbout, setShowAbout] = React.useState(false); 
  const [openDialog, setOpenDialog] = React.useState(false); 
  const [showTargetDialog, setShowTargetDialog] = React.useState(false); 
  const [editTarget, setEditTarget] = React.useState(false); 
  const [drawerOpen, setDrawerOpen] = React.useState(false); 
  // 读取 localStorage 保存的夜间模式状态
    const [isDarkMode, setIsDarkMode] = React.useState(() => {
      // 从 localStorage 读取夜间模式状态，默认为 false
      const savedMode = localStorage.getItem('isDarkMode');
      return savedMode === 'true';
    });
  
  React.useEffect(() => { 
    chrome.storage.local.get(['refreshCount', 'targetCount'], (result) => { 
      setRefreshCount(result.refreshCount || 0); 
      setTargetCount(result.targetCount || 1000); 
      setProgress((result.refreshCount || 0) / (result.targetCount || 1000) * 100); 
    
  
      if ((result.refreshCount || 0) >= (result.targetCount || 1000)) { 
        setShowTargetDialog(true); 
      } 
    }); 
  }, []); 

  const handleDrawerToggle = () => { 
    setDrawerOpen(!drawerOpen); 
  }; 

  const handleCloseDialog = () => { 
    setOpenDialog(false); 
  }; 

  const handleCloseTargetDialog = () => { 
    setShowTargetDialog(false); 
  }; 

  const handleResetCounter = () => { 
    chrome.storage.local.set({ refreshCount: 0 }, () => { 
      setRefreshCount(0); 
      setProgress(0); 
      handleCloseDialog(); 
    }); 
  }; 

  const toggleAbout = () => { 
    setShowAbout(!showAbout); 
  }; 

  const handleTargetClick = () => { 
    setEditTarget(true); 
  }; 

  const handleTargetChange = (event) => { 
    setTargetCount(Number(event.target.value)); 
  }; 

  const handleTargetBlur = () => { 
    chrome.storage.local.set({ targetCount }, () => { 
      setEditTarget(false); 
      setProgress((refreshCount / targetCount) * 100); 
    }); 
  }; 

  const DrawerList = ( 
    <Box sx={{ width: 200 }} role="presentation" onClick={handleDrawerToggle}> 
      <List> 
        <ListItem> 
          <ListItemText primary="项目贡献者" /> 
        </ListItem> 
        <Divider /> 
        <ListItem> 
          <Typography variant="body2"> 
            - 吹水明月<br /> 
            -        <br /> 
            - 
          </Typography> 
        </ListItem> 
        <Divider sx={{ my: 2 }} /> 
        <ListItem> 
          <ListItemText primary="项目地址" /> 
        </ListItem> 
        <ListItem> 
          <Typography variant="body2" color="primary"> 
            <a href="https://github.com/ChuiShui233" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}> 
              github.com/ChuiShui233 
            </a> 
          </Typography> 
        </ListItem> 
      </List> 
    </Box> 
  ); 

    // 切换模式的处理函数
    const handleToggleMode = () => {
      setIsDarkMode(prevMode => {
        const newMode = !prevMode;
        // 保存新模式到 localStorage
        localStorage.setItem('isDarkMode', newMode);
        return newMode;
      });
    };

  // 创建主题
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#f48fb1', // 粉色风格的主色
      },
      text: {
        primary: isDarkMode ? '#fff' : '#000',
        secondary: isDarkMode ? '#bbb' : '#555',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}> {/* 使用主题提供器 */}
      <CssBaseline />
      <Box 
        sx={{ 
          borderColor: isDarkMode ? '#333' : '#fff',
          padding: '20px', 
          textAlign: 'center', 
          width: '250px', 
          height: '360px', 
          overflowY: 'auto', 
          boxSizing: 'content-box', 
          bgcolor: isDarkMode ? '#333' : '#fff', 
          color: isDarkMode ? '#fff' : '#000', 
        }}
      >
        <Button onClick={handleToggleMode} style={{ position: 'absolute', top: 10, left: 10 }}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />} {/* 切换图标 */}
        </Button>

        {!showAbout && (
          <Button onClick={toggleAbout} style={{ position: 'absolute', top: 10, right: 10 }}>
            关于
          </Button>
        )}

        {!showAbout ? (
          <Slide direction="up" in={!showAbout} mountOnEnter unmountOnExit timeout={300}>
            <Box>
              <img src="./acg_image.png" alt="Image" style={{ width: '75%', height: '75%', marginBottom: '15px', borderRadius: '8px' }} />
              <Quote />
              <Typography variant="h6">刷新了 {refreshCount} 次网页！</Typography>

              <Typography variant="body1" onClick={handleTargetClick} sx={{ cursor: 'pointer', color: 'text.secondary', marginTop: 2 }}>
                目标数值：
                {editTarget ? (
                  <TextField value={targetCount} onChange={handleTargetChange} onBlur={handleTargetBlur} type="number" size="small" autoFocus />
                ) : (
                  <span>{targetCount}</span>
                )}
              </Typography>

              <Box sx={{ width: '100%', marginTop: 2 }}>
                <LinearProgressWithLabel value={progress} />
              </Box>

              <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginTop: 2 }}>
                重置计数
              </Button>
            </Box>
          </Slide>
        ) : (
          <Fade in={showAbout} timeout={300}>
            <Box>
              <img src="./icon.png" alt="Icon" style={{ width: '150px', height: '150px', margin: '10px auto', display: 'block' }} />
              <Typography variant="h6" style={{ fontFamily: 'Microsoft YaHei', marginBottom: '5px' }}>
                版本号: ShuiYue.A.1
              </Typography>
              <Button onClick={handleDrawerToggle} style={{ position: 'absolute', bottom: 10, left: 10, padding: 0 }}>
                <img src={isDarkMode ? "./github-mark-white.svg" : "./github-mark.svg"} alt="GitHub" style={{ width: '24px', height: '24px' }} /> {/* 根据模式切换图标 */}
              </Button>
              <Button onClick={toggleAbout} style={{ position: 'absolute', bottom: 10, right: 10 }}>
                返回
              </Button>
            </Box>
          </Fade>
        )}

        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          {DrawerList}
        </Drawer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>确认重置计数？</DialogTitle>
          <DialogContent>
            <DialogContentText>您确定要重置刷新计数吗？该操作无法撤销。</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">取消</Button>
            <Button onClick={handleResetCounter} color="primary" autoFocus>确认</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showTargetDialog} onClose={handleCloseTargetDialog}>
          <DialogTitle>🎉 恭喜达成目标！</DialogTitle>
          <DialogContent>
            <DialogContentText>您已达到目标数值！继续加油哦~</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseTargetDialog} color="primary">好的</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
