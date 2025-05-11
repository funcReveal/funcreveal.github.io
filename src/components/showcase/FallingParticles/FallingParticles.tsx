import React, { useEffect, useState } from 'react';
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
} from '@mui/material';

const presets = {
    rain: { count: 50, rotate: false, drift: true, tiltWithDrift: true, speedRange: [4, 5], sizeRange: [10, 20], opacity: 1, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 },
    drop: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [2.5, 5], sizeRange: [2, 8], opacity: 0.5, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.3 },
    heart: { count: 20, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.1, 1], sizeRange: [50, 100], opacity: 0.52, rotateSwingRange: 15, rotateSpeed: 0.015, driftAmount: 0.2 },
    maple: { count: 50, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [24, 48], opacity: 0.8, rotateSwingRange: 45, rotateSpeed: 0.03, driftAmount: 0.01 },
    bubble: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.3, 0.8], sizeRange: [10, 20], opacity: 0.8, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 },
    carnation: { count: 30, rotate: true, drift: true, tiltWithDrift: false, speedRange: [0.2, 1], sizeRange: [40, 80], opacity: 1, rotateSwingRange: 15, rotateSpeed: 0.010, driftAmount: 0.1 },
    snow: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [8, 16], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.5 },
    snowflake: { count: 50, rotate: false, drift: true, tiltWithDrift: false, speedRange: [0.4, 0.6], sizeRange: [15, 30], opacity: 0.2, rotateSwingRange: 0, rotateSpeed: 0, driftAmount: 0.4 },
};


type PresetType = keyof typeof presets;

const ShowFallingParticles: React.FC = () => {
    const [type, setType] = useState<'rain' | 'drop' | 'heart' | 'maple' | 'bubble' | 'carnation' | 'snow' | 'snowflake' | 'heart'>('carnation');
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

    useEffect(() => {
        if (type === 'carnation') {
            resetToPreset('carnation');
        }
    }, [type]);

    const resetToPreset = (presetType: PresetType) => {
        const preset = presets[presetType];
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
    };

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
                <FallingParticles
                    count={count}
                    rotate={rotate}
                    drift={drift}
                    types={[type]}
                    opacity={opacity}
                    driftAmount={driftAmount}
                    rotateSwingRange={rotateSwingRange}
                    rotateSpeed={rotateSpeed}
                    sizeRange={sizeRange}
                    speedRange={speedRange}
                    tiltWithDrift={tiltWithDrift}
                    textOverlay="❄ Happy Snow Day! ❄"
                />
            </Box>

            <Paper elevation={3} sx={{ p: 3, width: 320, bgcolor: '#6e6e6e22', color: 'var(--foreground)' }}>
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
                                <MenuItem value="drop">drop</MenuItem>
                                <MenuItem value="snowflake">snowflake</MenuItem>
                                <MenuItem value="heart">heart</MenuItem>
                            </Select>
                        </FormControl>
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
