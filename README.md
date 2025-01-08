![npm](https://img.shields.io/npm/v/repoify-js)

# Repoify - A Custom Version Control System (VCS)
Repoify is a custom-built **Version Control System (VCS)** created as a fun learning project to explore core concepts of version control, file management, and cloud storage integration using modern technologies.

### Key Features (In Progress)
- **Custom CLI Tool**: Built with **Node.js** and **Yargs** for intuitive command-line usage.
- **File System-based Versioning**: Tracks changes locally without relying on Git.
- **AWS Integration**: Stores commit files in **AWS S3** for secure remote access.
- **Commit Management**: Records commit metadata including timestamps and messages.

### Technologies Used
- **Node.js**: Core runtime for the VCS.
- **File System (fs)**: Local file operations.
- **Yargs**: For parsing command-line arguments.
- **AWS SDK**: Integration with AWS for cloud storage.

### Installation (In Development)
> **Note**: The project is currently under development and may not be stable for production use.

1. Clone the repository:
   ```bash
   git clone https://github.com/anilmoharanaofficial/VCS.git
   cd custom-vcs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure AWS credentials in `.env`:
   ```env
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   S3_BUCKET_NAME=your-bucket-name
   ```

### Planned Features
- **Branching and Merging**
- **Conflict Resolution**
- **Enhanced File Differencing**

### Status
This project is **still under development** and **not ready for production use**.

### License
MIT
