export default {
  id: 23,
  title: 'Java实现图片文件上传',
  time: '2022-12-10',
  type: '原创',
  eye: 24329,
  comment: 34523,
  share: 78,
  collect: 90,
  label: [
    { id: 1, name: 'JAVA' },
    { id: 2, name: 'JAVA WEB' },
    { id: 3, name: '图像上传' },
    { id: 4, name: 'WEB' },
    { id: 5, name: 'IT' },
  ],
  content:
    '<p>Java实现后台图片上传，将上传图片的接口进行分层，便于维护接口。</p>\n' +
    '<h3>接口部分（interface）</h3>\n' +
    '<p>将接口分为单图片上传以及多图片上传</p>\n' +
    '<pre>\n' +
    '<code class="language-java">public interface FileUploadService {\n' +
    '\t//单图片上传\n' +
    '    PicUploadResult uplodadImg(MultipartFile uploadFile, HttpServletRequest request);\n' +
    '\n' +
    '\t//多图片上传\n' +
    '    PicUploadResult uploadManyImg(MultipartFile[] uploadFile, HttpServletRequest request);\n' +
    '}\n' +
    '</code></pre>\n' +
    '<br>' +
    '<h3>接口实现类（interface impl）</h3>\n' +
    '<h4>上传图片方法类（主要）</h4>\n' +
    '<p>上传多个图片只是使用了数组的方式将文件存到<em>MultipartFile</em>里面。以防代码冗余，所以将实现方法抽出来</p>\n' +
    '<pre>\n' +
    '<code class="language-java">   /**\n' +
    '     * 上传图片方法类\n' +
    '     * @param multipartFile\n' +
    '     * @param request\n' +
    '     * @return\n' +
    '     */\n' +
    '    private PicUploadResult uploadImgMethod(MultipartFile multipartFile, HttpServletRequest request) {\n' +
    '        PicUploadResult picUploadResult = new PicUploadResult();\n' +
    '\n' +
    '        if (multipartFile.isEmpty()) {\n' +
    '            //返回选择文件提示\n' +
    '            picUploadResult.setLegal(false);\n' +
    '            return picUploadResult;\n' +
    '        }\n' +
    '        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd/");\n' +
    '        String format = sdf.format(new Date());\n' +
    '        //存放上传文件的文件夹\n' +
    '        File file = new File(baseFilePath + format);\n' +
    '        logger.info("-----------存放上传文件的文件夹【" + file + "】-----------");\n' +
    '        logger.info("-----------输出文件夹绝对路径 -- 这里的绝对路径是相当于当前项目的路径而不是“容器”路径【" + file.getAbsolutePath() + "】-----------");\n' +
    '        if (!file.isDirectory()) {\n' +
    '            //递归生成文件夹\n' +
    '            file.mkdirs();\n' +
    '        }\n' +
    '        //获取原始的名字  original:最初的，起始的  方法是得到原来的文件名在客户机的文件系统名称\n' +
    '        String oldName = multipartFile.getOriginalFilename();\n' +
    '        logger.info("-----------文件原始的名字【" + oldName + "】-----------");\n' +
    '        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());\n' +
    '        logger.info("-----------文件要保存后的新名字【" + newName + "】-----------");\n' +
    '        try {\n' +
    '            //构建真实的文件路径\n' +
    '            File newFile = new File(file.getAbsolutePath() + File.separator + newName);\n' +
    '            //转存文件到指定路径，如果文件名重复的话，将会覆盖掉之前的文件,这里是把文件上传到 “绝对路径”\n' +
    '            multipartFile.transferTo(newFile);\n' +
    '            String filePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/picbook/" + UPLOAD_PATH_PREFIX + format + newName;\n' +
    '            logger.info("-----------【" + filePath + "】-----------");\n' +
    '            picUploadResult.setLegal(true);\n' +
    '            picUploadResult.setImgPath(filePath);\n' +
    '            return picUploadResult;\n' +
    '        } catch (Exception e) {\n' +
    '            e.printStackTrace();\n' +
    '        }\n' +
    '        picUploadResult.setLegal(false);\n' +
    '        return picUploadResult;\n' +
    '    }\n' +
    '</code></pre>\n' +
    '<br>' +
    '<h3>实现方法接口</h3>\n' +
    '\n' +
    '<h4>单图片上传</h4>\n' +
    '<br>' +
    '\n' +
    '<pre>\n' +
    '<code class="language-java">public PicUploadResult uplodadImg(MultipartFile multipartFile, HttpServletRequest request) {\n' +
    '    return uploadImgMethod(multipartFile, request);\n' +
    '}\n' +
    '</code></pre>\n' +
    '<br>' +
    '<h4>多图片上传</h4>\n' +
    '<br>' +
    '<pre>\n' +
    '<code class="language-java">public PicUploadResult uploadManyImg(MultipartFile[] uploadFile, HttpServletRequest request) {\n' +
    '\n' +
    '    List&lt;String&gt; imgPaths = new ArrayList&lt;&gt;();\n' +
    '    for (MultipartFile multipartFile : uploadFile) {\n' +
    '        PicUploadResult picUploadResult = uploadImgMethod(multipartFile, request);\n' +
    '        if(picUploadResult.isLegal()){\n' +
    '            imgPaths.add(picUploadResult.getImgPath());\n' +
    '        } else{\n' +
    '            return picUploadResult;\n' +
    '        }\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    PicUploadResult picUploadResult = new PicUploadResult();\n' +
    '    picUploadResult.setLegal(true);\n' +
    '    picUploadResult.setImgPahts(imgPaths);\n' +
    '    return picUploadResult;\n' +
    '}\n' +
    '</code></pre>\n' +
    '<br>' +
    '<h4>实现方法补充</h4>\n' +
    '<br>' +
    '<pre>\n' +
    '<code class="language-java">    // 项目上传至绝对路径(在yml里配置你的项目绝对路径)\n' +
    '    @Value("${file.save-path}")\n' +
    '    private String baseFilePath;\n' +
    '    // 项目根路径下的目录  -- SpringBoot static 目录相当于是根路径下（SpringBoot 默认）\n' +
    '    private final static String UPLOAD_PATH_PREFIX = "statics/uploadFile/";\n' +
    '</code></pre>\n' +
    '<br>' +
    '<h3>控制层</h3>\n' +
    '<br>' +
    '<pre>\n' +
    '<code class="language-java">public class FileUploadController {\n' +
    '    // 允许上传的格式 图片形式\n' +
    '    private static final String[] IMAGE_TYPE = new String[]{".bmp", ".jpg", ".jpeg", ".png"};\n' +
    '\n' +
    '    @Resource\n' +
    '    private FileUploadService fileUploadService;\n' +
    '\n' +
    '    @PostMapping("/uploadImg")\n' +
    '    public R uploadImg(@RequestParam("file") MultipartFile file, HttpServletRequest request) {\n' +
    '        boolean isFlag = false;\n' +
    '        for (String type : IMAGE_TYPE) {\n' +
    '            System.out.println(file.getOriginalFilename());\n' +
    '            if (StringUtils.endsWithIgnoreCase(file.getOriginalFilename(), type)) {\n' +
    '                isFlag = true;\n' +
    '                break;\n' +
    '            }\n' +
    '        }\n' +
    '\n' +
    '        if (isFlag) {\n' +
    '            PicUploadResult picUploadResult = fileUploadService.uplodadImg(file, request);\n' +
    '            boolean isLegal = picUploadResult.isLegal();\n' +
    '\n' +
    '            if (isLegal) {\n' +
    '                Map resMap = new HashMap&lt;&gt;();\n' +
    '                resMap.put("imgPath", picUploadResult.getImgPath());\n' +
    '                return R.ok(resMap);\n' +
    '            } else {\n' +
    '                return R.error("图片上传有误");\n' +
    '            }\n' +
    '        } else {\n' +
    '            return R.error("上传的图片格式必须为:bmp,jpg,jpeg,png");\n' +
    '        }\n' +
    '\n' +
    '    }\n' +
    '\n' +
    '    @PostMapping("/uploadManyImg")\n' +
    '    public R uploadManyImg(@RequestParam("files") MultipartFile[] files, HttpServletRequest request) {\n' +
    '        boolean isFlag = false;\n' +
    '        for (MultipartFile uploadFile : files) {\n' +
    '            for (String type : IMAGE_TYPE) {\n' +
    '                if (StringUtils.endsWithIgnoreCase(uploadFile.getOriginalFilename(), type)) {\n' +
    '                    isFlag = true;\n' +
    '                    break;\n' +
    '                }\n' +
    '            }\n' +
    '        }\n' +
    '\n' +
    '        if (isFlag) {\n' +
    '            PicUploadResult picUploadResult = fileUploadService.uploadManyImg(files, request);\n' +
    '            boolean isLegal = picUploadResult.isLegal();\n' +
    '\n' +
    '            if (isLegal) {\n' +
    '                Map resMap = new HashMap&lt;&gt;();\n' +
    '                resMap.put("imgPaths", picUploadResult.getImgPahts());\n' +
    '                return R.ok(resMap);\n' +
    '            } else {\n' +
    '                return R.error("图片上传有误");\n' +
    '            }\n' +
    '        } else {\n' +
    '            return R.error("上传的图片格式必须为:bmp,jpg,jpeg,png");\n' +
    '        }\n' +
    '    }\n' +
    '}\n' +
    '</code></pre>\n' +
    '<br>' +
    '<h3>工具类</h3>\n' +
    '\n' +
    '<p>根据实际情况添加所需的字段</p>\n' +
    '<pre>\n' +
    '<code class="language-java">public class PicUploadResult {\n' +
    '    private boolean isLegal;\n' +
    '    private String imgPath;\n' +
    '    private List&lt;String&gt; imgPahts;\n' +
    '}\n' +
    '</code></pre>',
}
