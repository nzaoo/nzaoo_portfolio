# 🎮 Portfolio 3D - Nhân Vật Hoạt Hình Tương Tác

Một website portfolio 3D sáng tạo với nhân vật hoạt hình có thể điều khiển, di chuyển trong không gian 3D và tương tác với các object để xem thông tin portfolio.

## ✨ Tính năng

### 🎯 Trải nghiệm người dùng

- **Góc nhìn thứ ba (Third-person)**: Điều khiển nhân vật mèo hoạt hình
- **Di chuyển mượt mà**: Sử dụng phím WASD để di chuyển
- **Animation tự động**: Chuyển đổi animation mượt mà (idle, walk, run, standup, seated)
- **Tương tác object**: Hiện popup khi lại gần object, nhấn Enter để xem chi tiết

### 🏠 Các khu vực tương tác

- **🏠 Căn phòng**: Giới thiệu bản thân (About)
- **💻 Bàn máy tính**: Các dự án đã làm (Projects)
- **📚 Giá sách**: Blog / Nhật ký học tập
- **🚪 Cửa ra**: Liên hệ + Tải CV
- **🔬 Bàn lab**: Playground - thử nghiệm code

### 🛠️ Công nghệ sử dụng

- **Frontend**: React + Next.js
- **3D Graphics**: React Three Fiber + Three.js
- **Animation**: Framer Motion + AnimationMixer
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context
- **TypeScript**: Type safety và developer experience

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/nzaoo/nzaoo_portfolio.git
cd nzaoo_portfolio

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Build production

```bash
npm run build
npm start
```

## 🎮 Cách sử dụng

### Điều khiển nhân vật

- **W**: Di chuyển về phía trước
- **S**: Di chuyển về phía sau
- **A**: Di chuyển sang trái
- **D**: Di chuyển sang phải
- **Enter**: Tương tác với object gần nhất

### Tương tác với object

1. Di chuyển nhân vật đến gần object (bàn, cửa, giá sách, lab)
2. Hiện tooltip hướng dẫn
3. Nhấn **Enter** để mở overlay chi tiết
4. Click nút **X** hoặc click ngoài để đóng

## 📁 Cấu trúc dự án

```
nzaoo_portfolio/
├── public/
│   ├── models/                    # 3D models (.glb files)
│   │   └── character_all_animations.glb
│   └── assets/                    # Images, icons
├── src/
│   ├── components/                # React components
│   │   ├── CanvasScene.tsx        # Main 3D scene
│   │   ├── Character.tsx          # 3D character with animations
│   │   ├── Environment.tsx        # 3D environment & objects
│   │   ├── InteractionPrompt.tsx  # Tooltip UI
│   │   └── UIOverlay.tsx          # Modal overlay
│   ├── hooks/                     # Custom hooks
│   │   ├── useCharacterAnimation.ts
│   │   ├── useInteraction.ts
│   │   └── useKeyboardControls.ts
│   ├── context/                   # React Context
│   │   └── InteractionContext.tsx
│   ├── data/                      # Static data
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── projects.ts            # Project data
│   │   ├── skills.ts              # Skills data
│   │   └── timeline.ts            # Timeline data
│   └── pages/                     # Next.js pages
│       └── index.tsx              # Main page
└── README.md
```

## 🎨 Tùy chỉnh

### Thêm dự án mới

Chỉnh sửa file `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "your-project",
    name: "Tên dự án",
    description: "Mô tả dự án",
    image: "/assets/project-image.png",
    link: "https://your-project.com",
    tags: ["React", "TypeScript"],
  },
  // Thêm dự án khác...
];
```

### Thêm kỹ năng mới

Chỉnh sửa file `src/data/skills.ts`:

```typescript
export const skills: Skill[] = [
  {
    id: "new-skill",
    name: "Tên kỹ năng",
    level: "Advanced",
    icon: "/assets/skill-icon.svg",
  },
  // Thêm kỹ năng khác...
];
```

### Thay đổi 3D model

1. Chuẩn bị file .glb với các animation (idle, walk, run, standup, seated)
2. Đặt file vào `public/models/character_all_animations.glb`
3. Đảm bảo tên animation trong file trùng với code

## 🔧 Tối ưu hóa

### Performance

- **Lazy loading**: Sử dụng React Suspense cho 3D models
- **Error boundaries**: Xử lý lỗi khi load model
- **Animation optimization**: Sử dụng AnimationMixer cho chuyển đổi mượt mà
- **Responsive design**: UI tối ưu cho mọi thiết bị

### Code quality

- **TypeScript**: Type safety và IntelliSense
- **Custom hooks**: Tách logic thành reusable hooks
- **Component composition**: Tách biệt logic và UI
- **Error handling**: Xử lý lỗi graceful

## 🚧 Roadmap

### Phase 1: Core Features ✅

- [x] 3D character với animation
- [x] Di chuyển bằng WASD
- [x] Tương tác với object
- [x] UI overlay responsive
- [x] Data management

### Phase 2: Enhancement 🚧

- [ ] Thêm âm thanh (footsteps, UI sounds)
- [ ] Particle effects
- [ ] Day/night cycle
- [ ] Weather effects
- [ ] Mini-games trong scene

### Phase 3: Advanced Features 📋

- [ ] Multiple scenes/maps
- [ ] Blog integration (MDX)
- [ ] Real-time collaboration
- [ ] VR support
- [ ] Mobile touch controls

### Phase 4: Scale 📋

- [ ] CMS integration
- [ ] Analytics dashboard
- [ ] A/B testing
- [ ] Performance monitoring
- [ ] SEO optimization

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Cảm ơn

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer cho Three.js
- [Three.js](https://threejs.org/) - 3D library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Mixamo](https://www.mixamo.com/) - 3D character animations

---

**Made with ❤️ by [Your Name]**
