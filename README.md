# CryptoGuard 🚀

**CryptoGuard** es tu compañero ideal para manejar tus criptomonedas. Imagina una herramienta que te ayuda a cuidar tu dinero digital, te da consejos para invertirlo bien y lo hace todo de forma fácil y segura. ¡Eso es CryptoGuard!

### ¿Qué puedes hacer con CryptoGuard?
- **Seguir tus criptos al momento**: Mira cuánto valen tus monedas digitales en tiempo real.
- **Recibir consejos útiles**: Un asistente virtual te sugiere cómo sacarle más provecho a tu dinero basándose en cómo está el mercado.
- **Invertir sin complicaciones**: Configura reglas para que CryptoGuard compre o venda por ti cuando los precios suban o bajen.
- **Mantener tu dinero seguro**: Te avisa si alguien intenta tocar tu billetera sin permiso.
- **Practicar sin riesgos**: Usa un simulador para probar tus ideas de inversión sin gastar un centavo.
- **Conectar con otros**: Comparte tus trucos o sigue los consejos de otros usuarios.

Es tan sencillo que cualquiera puede usarlo, incluso si apenas estás empezando con las criptomonedas.

### ¿Cómo lo hicimos?
Usamos herramientas modernas para que todo sea rápido, bonito y fácil de usar:
- **Next.js**: Hace que la página cargue volando y se vea bien en tu celular o computadora.
- **Tailwind CSS**: Le da un diseño limpio y agradable a la vista.
- **ethers.js**: Conecta tu billetera para que veas tu dinero sin complicaciones.
- **Chart.js**: Te muestra gráficos para que entiendas cómo van tus inversiones.

## Roadmap del Frontend
### Etapa 1
**Tecnologías**: Next.js (con TypeScript), Tailwind CSS, Context API, AWS Amplify.
**Funcionalidades**:
- Crear landing page, login y registro con autenticación basada en JWT.
- Seguimiento básico de criptomonedas (listado y precios).
**Detalles**: Configurar CI/CD con GitHub Actions y hosting serverless en AWS Amplify.

### Etapa 2
**Tecnologías**: ethers.js, Socket.io, Storybook.
**Funcionalidades**:
- Monitoreo de billeteras con alertas de transacciones.
- Notificaciones en tiempo real para eventos de seguridad.
**Detalles**: Documentar y probar componentes de UI aislados con Storybook.

### Etapa 3
**Tecnologías**: Chart.js, CoinGecko API, i18n.
**Funcionalidades**:
- Visualización de rendimiento de inversiones con gráficos.
- Simulador de inversiones basado en datos históricos.
- Soporte multi-idioma.
**Detalles**: Usar Chart.js para gráficos dinámicos y CoinGecko para datos en tiempo real.

### Etapa 4
**Tecnologías**: ISR (Next.js), Google Optimize.
**Funcionalidades**:
- Optimización para alto tráfico.
- Pruebas A/B para mejorar conversión en landing page.
**Detalles**: Implementar regeneración estática incremental (ISR) para mejorar rendimiento.
