module.exports = (answers)=>{
    const {mode} =answers;
    switch(mode)
    {
        case 'm': console.log('user opted to filter modules');
                break;
        case 'p': console.log('user opted to pase watching');
                break;
        case 'r':console.log('user opted to reload configuraion and restart webpack');
                break;
        case 'c':console.log('user opted to clear cache and recompile');
                break;
        case 'e':console.log('user opted to explore mode to interactively walk the module graph to find out whya moduleis included');
                break;
        case 'w':console.log('user opted to select a module and print out wy its included');
                break;
        case 'q':console.log('user opted to quit');
                break;
    }
}