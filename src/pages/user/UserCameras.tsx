import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Play, 
  Pause, 
  Maximize, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Download,
  Share2,
  AlertCircle
} from 'lucide-react';
import { Device } from '../../types';
import { mockDevices } from '../../utils/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const UserCameras: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [muted, setMuted] = useState<Record<string, boolean>>({});

  const cameras = mockDevices.filter(device => device.type === 'camera');

  const togglePlay = (cameraId: string) => {
    setPlaying(prev => ({ ...prev, [cameraId]: !prev[cameraId] }));
  };

  const toggleMute = (cameraId: string) => {
    setMuted(prev => ({ ...prev, [cameraId]: !prev[cameraId] }));
  };

  const handleFullscreen = (cameraId: string) => {
    setSelectedCamera(cameraId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Video className="w-8 h-8 mr-3" />
            Security Cameras
          </h1>
          <p className="text-slate-400">
            Monitor your property with live video feeds and recordings
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-400 font-medium">LIVE</span>
          </div>
          <span className="text-slate-400 text-sm">
            {cameras.filter(c => c.status === 'online').length} of {cameras.length} cameras online
          </span>
        </div>
      </motion.div>

      {/* Camera Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-white">{cameras.length}</div>
          <div className="text-slate-400 text-sm">Total Cameras</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success-400">
            {cameras.filter(c => c.status === 'online').length}
          </div>
          <div className="text-slate-400 text-sm">Online</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning-400">
            {Math.floor(Math.random() * 10) + 5}
          </div>
          <div className="text-slate-400 text-sm">Motion Events</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary-400">
            {Math.floor(Math.random() * 50) + 20} GB
          </div>
          <div className="text-slate-400 text-sm">Storage Used</div>
        </Card>
      </div>

      {/* Main Camera View */}
      {selectedCamera && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              poster="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1200"
              controls
              autoPlay
              muted
            >
              <source src="/placeholder-video.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-black bg-opacity-50 rounded-lg p-3">
                <h3 className="text-white font-semibold">
                  {cameras.find(c => c.id === selectedCamera)?.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-sm">LIVE</span>
                  <span className="text-slate-300 text-sm">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedCamera(null)}
                className="bg-black bg-opacity-50"
              >
                ✕
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Camera Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameras.map((camera) => (
          <motion.div
            key={camera.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden" hover>
              {/* Video Container */}
              <div className="relative aspect-video bg-slate-800">
                <img
                  src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt={camera.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Status Overlay */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  {camera.status === 'online' ? (
                    <div className="flex items-center space-x-1 bg-black bg-opacity-60 rounded-full px-2 py-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 text-xs font-medium">LIVE</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 bg-black bg-opacity-60 rounded-full px-2 py-1">
                      <AlertCircle className="w-3 h-3 text-red-400" />
                      <span className="text-red-400 text-xs font-medium">OFFLINE</span>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-60 rounded px-2 py-1">
                  <span className="text-white text-xs">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>

                {/* Controls Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePlay(camera.id)}
                      className="bg-black bg-opacity-50"
                    >
                      {playing[camera.id] ? 
                        <Pause className="w-4 h-4" /> : 
                        <Play className="w-4 h-4" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleMute(camera.id)}
                      className="bg-black bg-opacity-50"
                    >
                      {muted[camera.id] ? 
                        <VolumeX className="w-4 h-4" /> : 
                        <Volume2 className="w-4 h-4" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFullscreen(camera.id)}
                      className="bg-black bg-opacity-50"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Camera Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{camera.name}</h3>
                    <p className="text-slate-400 text-sm">{camera.room}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    camera.status === 'online' ? 'bg-success-400' :
                    camera.status === 'warning' ? 'bg-warning-400' :
                    'bg-error-400'
                  }`} />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" icon={<RotateCcw className="w-4 h-4" />} />
                    <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                    <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />} />
                  </div>
                  
                  <div className="text-slate-400 text-xs">
                    Last updated: {new Date(camera.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Events */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Recent Motion Events
        </h3>
        
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-slate-700 rounded overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Motion event thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Motion detected at {cameras[Math.floor(Math.random() * cameras.length)]?.name}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {new Date(Date.now() - Math.random() * 3600000).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};