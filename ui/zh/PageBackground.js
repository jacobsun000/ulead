export const backgroundStyles = {
  home: {
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500',
    decorativeShapes: true
  },
  highschool: {
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500',
    backgroundImage: '/img/zh/highschool-bg.jpg',
    overlay: 'bg-black/40'
  },
  university: {
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500',
    backgroundImage: '/img/zh/university-bg.jpg',
    overlay: 'bg-black/40'
  },
  leadProgram: {
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500',
    decorativeShapes: true
  },
  summerSchool: {
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500',
    backgroundImage: '/img/zh/summer-school-bg.jpg',
    overlay: 'bg-black/40'
  },
  default: {
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-blue-500',
    decorativeShapes: true
  }
};

function DecorativeShapes() {
  return (
    <>
      {/* Large decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl"></div>
    </>
  );
}

export default function PageBackground({
  page = 'default',
  className = '',
  children,
  minHeight = 'min-h-screen'
}) {
  const style = backgroundStyles[page] || backgroundStyles.default;

  return (
    <div className={`relative ${style.gradient} ${minHeight} overflow-hidden ${className}`}>
      {/* Background Image if specified */}
      {style.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${style.backgroundImage})` }}
        />
      )}

      {/* Overlay if specified */}
      {style.overlay && (
        <div className={`absolute inset-0 ${style.overlay}`} />
      )}

      {/* Decorative shapes if enabled */}
      {style.decorativeShapes && <DecorativeShapes />}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
