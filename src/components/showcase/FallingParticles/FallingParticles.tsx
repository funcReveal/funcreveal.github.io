import React, { useEffect, useState, useCallback } from 'react';
import FallingParticles from '@/components/effects/FallingParticles/FallingParticles';
import {
    Box,
    Slider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Typography,
    Paper,
    Grid,
    TextField,
} from '@mui/material';

const presets = {
    rain: { count: 50, rotate: false, drift: true, tiltWithDrift: true, speedRange: [4, 5], sizeRange: [10, 20], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 },
    heart: { count: 20, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [50, 100], opacity: 0.52, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 },
    maple: { count: 50, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [24, 48], opacity: 0.8, rotateSwingRange: 45, rotateSpeed: 0.03, driftAmount: 0.01 },
    bubble: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.3, 0.8], sizeRange: [10, 20], opacity: 0.8, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 },
    carnation: { count: 30, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 },
    snow: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [8, 16], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 },
    snowflake: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [15, 30], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.4 },
    all: { count: 100, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [50, 100], opacity: 0.52, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 },
};

const backgroundPresets: Record<string, string> = {
    rain: 'linear-gradient(135deg, #2c3e50, #4ca1af)',          // 深藍到青藍，讓雨滴顯眼
    heart: 'linear-gradient(135deg, #fceabb, #f8b500)',          // 柔和金橘，襯托粉紅心形
    maple: 'linear-gradient(135deg, #7f5539, #f4a261)',          // 楓葉色調（深棕到亮橘）
    bubble: 'linear-gradient(135deg, #2e3c50, #b2d0f7)',         // 深藍灰到藍白泡泡對比
    carnation: 'linear-gradient(135deg, #ffd6d6, #ff9a9e)',       // 淡粉紅至亮桃紅
    snow: 'linear-gradient(135deg, #4b6cb7, #182848)',           // 冷色深藍背景，雪花會變明顯
    snowflake: 'linear-gradient(135deg, #3e5151, #decba4)',      // 淺金搭配暗灰，讓雪更立體
    all: '',
};

type PresetType = keyof typeof presets;

const ShowFallingParticles: React.FC = () => {
    const [type, setType] = useState<'rain' | 'heart' | 'maple' | 'bubble' | 'carnation' | 'snow' | 'snowflake' | 'heart' | 'all'>('carnation');
    const [count, setCount] = useState(20);
    const [rotate, setRotate] = useState(true);
    const [drift, setDrift] = useState(true);
    const [tiltWithDrift, setTiltWithDrift] = useState(false);
    const [opacity, setOpacity] = useState(0.85);
    const [driftAmount, setDriftAmount] = useState(0.2);
    const [rotateSwingRange, setRotateSwingRange] = useState(15);
    const [rotateSpeed, setRotateSpeed] = useState(0.015);
    const [sizeRange, setSizeRange] = useState<[number, number]>([20, 40]);
    const [speedRange, setSpeedRange] = useState<[number, number]>([0.1, 1]);
    const [textOverlay, setTextOverlay] = useState(`🌷 Happy Mother's Day! 🌷`);
    const [background, setBackground] = useState(backgroundPresets['carnation']);
    const [isCustomBackground, setIsCustomBackground] = useState(false);
    const [isCustomText, setIsCustomText] = useState(false); // 追蹤是否手動輸入過

    const [isReady, setIsReady] = useState(false);

    // 使用者編輯文字時要設為 true
    const handleTextOverlayChange = (value: string) => {
        setIsCustomText(true);
        setTextOverlay(value);
    };

    const resetToPreset = useCallback((presetType: PresetType) => {
        const preset = presets[presetType];
        const defaultTexts: Record<string, string> = {
            carnation: `🌷 Happy Mother's Day! 🌷`,
        };

        setCount(preset.count);
        setRotate(preset.rotate);
        setDrift(preset.drift);
        setOpacity(preset.opacity);
        setDriftAmount(preset.driftAmount);
        setRotateSwingRange(preset.rotateSwingRange);
        setRotateSpeed(preset.rotateSpeed);
        setSizeRange(preset.sizeRange as [number, number]);
        setSpeedRange(preset.speedRange as [number, number]);
        setTiltWithDrift(preset.tiltWithDrift);

        if (!isCustomText) {
            setTextOverlay(defaultTexts[presetType] ?? '');
        }
    }, [isCustomText]);

    useEffect(() => {
        resetToPreset(type);

        if (!isCustomBackground && backgroundPresets[type]) {
            setBackground(backgroundPresets[type]);
        }
        setIsReady(true);
    }, [type, isCustomBackground, resetToPreset]);

    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="center"
            gap={4}
            sx={{ overflow: 'auto' }}
        >

            <Box
                width={{ xs: '80vw', sm: '50vw' }}
                height={{ xs: '33dvh', sm: '66vh' }}
            >
                {isReady && (
                    <FallingParticles
                        count={count}
                        rotate={rotate}
                        drift={drift}
                        type={type}
                        opacity={opacity}
                        driftAmount={driftAmount}
                        rotateSwingRange={rotateSwingRange}
                        rotateSpeed={rotateSpeed}
                        sizeRange={sizeRange}
                        speedRange={speedRange}
                        tiltWithDrift={tiltWithDrift}
                        textOverlay={textOverlay}
                        background={background}
                    />
                )}
            </Box>

            <Paper elevation={3} sx={{ p: 3, width: 320, bgcolor: '#6e6e6e22', color: 'var(--foreground)' }} >
                <Grid container spacing={2} direction="column">
                    <Grid >
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'var(--foreground)' }}>Type</InputLabel>
                            <Select sx={{ color: 'var(--foreground)', bgcolor: 'var(--foreground-20)' }} value={type} label="Type" onChange={(e) => {
                                const newType = e.target.value as PresetType;
                                setType(newType);
                                resetToPreset(newType);
                            }}
                            >
                                <MenuItem value="carnation">carnation</MenuItem>
                                <MenuItem value="rain">rain</MenuItem>
                                <MenuItem value="maple">maple</MenuItem>
                                <MenuItem value="bubble">bubble</MenuItem>
                                <MenuItem value="snow">snow</MenuItem>
                                <MenuItem value="snowflake">snowflake</MenuItem>
                                <MenuItem value="heart">heart</MenuItem>
                                <MenuItem value="all">all</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel sx={{ mt: 3, color: 'var(--foreground)' }}>Background</InputLabel>
                            <Select
                                value={Object.keys(backgroundPresets).find(key => backgroundPresets[key] === background) || ''}
                                sx={{ mt: 3, color: 'var(--foreground)', bgcolor: 'var(--foreground-20)' }}
                                label="Background"
                                onChange={(e) => {
                                    const key = e.target.value;
                                    setBackground(backgroundPresets[key]);
                                    setIsCustomBackground(true); // ✅ 標記為自訂
                                }}
                            >
                                <MenuItem value="carnation">carnation</MenuItem>
                                <MenuItem value="rain">rain</MenuItem>
                                <MenuItem value="maple">maple</MenuItem>
                                <MenuItem value="bubble">bubble</MenuItem>
                                <MenuItem value="snow">snow</MenuItem>
                                <MenuItem value="snowflake">snowflake</MenuItem>
                                <MenuItem value="heart">heart</MenuItem>
                                <MenuItem value="all">all</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <InputLabel sx={{ color: 'var(--foreground)' }}>Overlay Text</InputLabel>
                        <TextField
                            sx={{
                                bgcolor: 'var(--foreground-20)',
                                input: { color: 'var(--foreground)' },
                            }}
                            fullWidth
                            variant="outlined"
                            value={textOverlay}
                            onChange={(e) => handleTextOverlayChange(e.target.value)}
                        />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Count: {count}</Typography>
                        <Slider min={7} max={100} value={count} onChange={(_, val) => setCount(val as number)} />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Opacity: {opacity.toFixed(2)}</Typography>
                        <Slider min={0} max={1} step={0.01} value={opacity} onChange={(_, val) => setOpacity(val as number)} />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Drift Amount: {driftAmount.toFixed(2)}</Typography>
                        <Slider min={0} max={2} step={0.05} value={driftAmount} onChange={(_, val) => setDriftAmount(val as number)} />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Rotate Swing (±°): {rotateSwingRange}</Typography>
                        <Slider min={0} max={90} value={rotateSwingRange} onChange={(_, val) => setRotateSwingRange(val as number)}
                        />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Rotate Speed: {rotateSpeed.toFixed(3)}</Typography>
                        <Slider min={0.001} max={0.1} step={0.001} value={rotateSpeed} onChange={(_, val) => setRotateSpeed(val as number)}
                        />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Size Range: {sizeRange[0]} - {sizeRange[1]}</Typography>
                        <Slider
                            value={sizeRange}
                            onChange={(_, val) => setSizeRange(val as [number, number])}
                            valueLabelDisplay="auto"
                            min={5}
                            max={100}
                        />
                    </Grid>

                    <Grid >
                        <Typography gutterBottom>Speed Range: {speedRange[0]} - {speedRange[1]}</Typography>
                        <Slider
                            value={speedRange}
                            onChange={(_, val) => setSpeedRange(val as [number, number])}
                            valueLabelDisplay="auto"
                            min={0.1}
                            max={5}
                            step={0.1}
                        />
                    </Grid>

                    <Grid >
                        <FormControlLabel control={<Checkbox checked={rotate} onChange={() => setRotate(r => !r)} />} label="Rotate" />
                        <FormControlLabel control={<Checkbox checked={drift} onChange={() => setDrift(d => !d)} />} label="Drift" />
                        <FormControlLabel control={<Checkbox checked={tiltWithDrift} onChange={() => setTiltWithDrift(t => !t)} />} label="TiltWithDrift" />
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    );
};

export default ShowFallingParticles;
