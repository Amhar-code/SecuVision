# Shoplifting Detection System with YOLO

A real-time shoplifting detection system that uses YOLO (You Only Look Once) to identify potential shoplifting activities in video streams. The system provides real-time alerts through WhatsApp and stores detection data in Firebase.

## Features

- 🎯 Real-time shoplifting detection using YOLOv8
- 🔔 Instant WhatsApp notifications with images of detected incidents
- ☁️ Cloud storage of detected incidents using Cloudinary
- 📊 Firebase integration for data storage and management
- 📹 Support for both live camera feed and pre-recorded videos
- 🚨 Configurable confidence thresholds and alert cooldown periods
- 📱 Responsive web interface for monitoring

## Prerequisites

- Python 3.8+
- NVIDIA GPU (recommended) with CUDA support
- Webcam or video source
- Twilio account for WhatsApp notifications
- Firebase project for data storage
- Cloudinary account for image storage

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd YOLO
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv myenv
   .\myenv\Scripts\activate  # On Windows
   # or
   source myenv/bin/activate  # On Linux/Mac
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
   
   If requirements.txt doesn't exist, install the following packages:
   ```bash
   pip install opencv-python torch ultralytics twilio firebase-admin cloudinary pyserial
   ```

## Configuration

1. **Twilio Setup**:
   - Create a Twilio account and get your `account_sid` and `auth_token`
   - Set up WhatsApp sandbox for your Twilio number

2. **Firebase Setup**:
   - Create a Firebase project
   - Download the service account key as `Credentials.json`
   - Update the Firebase database URL in the code

3. **Cloudinary Setup**:
   - Create a Cloudinary account
   - Configure with your `cloud_name`, `api_key`, and `api_secret`

4. **Update Configuration**:
   - Update the following variables in `Alert_System.ipynb`:
     - Twilio credentials
     - Firebase configuration
     - Cloudinary configuration
     - Alert phone numbers

## Usage

### Training the Model

1. Prepare your dataset in YOLO format and update the `data.yaml` file
2. Run the training notebook:
   ```bash
   jupyter notebook Training_model.ipynb
   ```
3. The trained model will be saved in the `runs/detect/train/weights/` directory

### Running the Detection System

1. Launch the alert system:
   ```bash
   jupyter notebook Alert_System.ipynb
   ```
2. Run all cells in the notebook
3. The system will start processing the video feed and send alerts when shoplifting is detected

### Web Interface

1. Navigate to the `Frontend` directory
2. Open `index.html` in a web browser
3. The dashboard will show real-time detections and alerts

## Project Structure

```
YOLO/
├── Alert_System.ipynb         # Main detection and alert system
├── Training_model.ipynb       # Model training notebook
├── Credentials.json           # Firebase credentials
├── Frontend/                  # Web interface
├── Detected_images/           # Stores captured images of detections
├── chunk_video/               # Video chunks for processing
├── local_videos/              # Local video storage
├── shopliftingimg/            # Training dataset
├── test_video/                # Test videos
└── runs/                      # Training outputs and model weights
```

## Customization

- Adjust `confidence_threshold` to change detection sensitivity
- Modify `alert_cooldown` to set the minimum time between alerts (in seconds)
- Update `frame_skip` to improve performance on slower systems
- Add or modify detection classes in the YOLO model

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)
- [OpenCV](https://opencv.org/)
- [Twilio](https://www.twilio.com/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)

## Support

For support, please open an issue in the repository or contact the development team.
