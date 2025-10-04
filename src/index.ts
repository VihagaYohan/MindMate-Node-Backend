import app from './server'
import color from 'colors'

app.listen(3000, () => {
    console.log(color.yellow.underline.bold(`Server running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));
})