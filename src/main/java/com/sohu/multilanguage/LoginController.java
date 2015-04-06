package com.sohu.multilanguage;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sohu.multilanguage.core.Multilanguage;

@Controller
public class LoginController {
  private static final String RELATIVE_PATH = "language";

  private static final String FILE_SUFFIX = ".properties";

  @RequestMapping(value = "/login.html*", method = RequestMethod.GET)
  public String root() {
    return "login";
  }

  @RequestMapping(value = "/", method = RequestMethod.GET)
  public String home() {
    return "login";
  }

  @ResponseBody
  @RequestMapping(value = "/load_labellanguage.json", method = RequestMethod.GET)
  public Map<String, String> loadLabellanguage(@RequestParam(value = "lang_type") String langType,
      @RequestParam(value = "folder_name") String folderName,
      @RequestParam(value = "file_name") String fileName) {
    Multilanguage language = new Multilanguage(RELATIVE_PATH);
    Map<String, String> valueMap =
        language.getFileMap(langType, folderName, fileName + FILE_SUFFIX);
    return valueMap;
  }
}
